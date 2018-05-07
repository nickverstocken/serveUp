import {Component, HostListener, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServupService} from '../../services/servup.service';
import {Service} from '../../models/Service';
import {AuthService} from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  mobile = false;
  innerWidth;
  offerlist: any;
  currentSelected: number;
  currentRequest: number;
  currentService: Service;
  messages;
  pricelistopened = false;
  constructor(private router: Router, private route: ActivatedRoute, private serveUpService: ServupService, private auth: AuthService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 960) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 960) {
      this.mobile = true;
    }
    this.auth.currentUser.subscribe(user => {
      if(user.id){
        this.route.params.subscribe(
          params => {
            if (this.currentRequest !== params['id']) {
              this.currentRequest = params['id'];
              this.serveUpService.getRequest(params['id']).subscribe(result => {
                  this.currentSelected = params['offerid'];
                  this.offerlist = result.request.offers;
                },
                error => {
                  if (error.status === 404) {
                    this.router.navigate(['projects']);
                  }
                });
            }
            if (this.currentSelected !== params['offerid']) {
              this.getSelectedOffer(params['offerid']);
            }
          });
      }
    });

  }

  ngAfterViewInit() {
    const links = document.getElementsByTagName('a');
    for (let i = 0, j = links.length; i < j; i++) {
      links[i].setAttribute('tabindex', '-1');
    }
  }

  getSelectedOffer(id) {
    this.serveUpService.getOffer(this.currentRequest, id).subscribe(result => {
        this.currentService = result.offer.service;
        this.serveUpService.getMessages(id).subscribe(result2 => {
          this.messages = result2.messages;
        });
      },
      error => {
        if (error.status === 404) {
          this.router.navigate(['projects']);
        }
      });
  }
  sendMessage(event){
    const chatmessage = event.chatmessage;
    const index = event.index;
    this.serveUpService.sendMessage(this.currentSelected, chatmessage).subscribe(result => {
      this.messages[index] = result.message;
    });
  }
  changeSelected(offerid) {
    this.currentSelected = offerid;
    this.router.navigate(['project/' + this.currentRequest + '/offer/' + this.currentSelected]);
  }

  toggleUserPriceList() {
    this.pricelistopened = true;
    $('#overview').toggleClass('open');
    $('.leftSubNav').toggleClass('open');
    $('#overlayProjectDetails').toggleClass('opened');
  }

  closeOverview() {
    this.pricelistopened = false;
    $('#overview').removeClass('open');
    $('.leftSubNav').removeClass('open');
    $('#overlayProjectDetails').removeClass('opened');
  }
}
