import {Component, HostListener, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  mobile = false;
  innerWidth;
  constructor(private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          console.log('NavigationEnd:', event.url);
        }
      });
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
    if (!this.mobile) {
    }
  }

  ngAfterViewInit() {
    const links = document.getElementsByTagName('a');
    for (let i = 0, j = links.length; i < j; i++) {
      links[i].setAttribute('tabindex', '-1');
    }
  }
  toggleUserPriceList(){
      $('#overview').toggleClass('open');
      $('.leftSubNav').toggleClass('open');
      $('#overlayProjectDetails').toggleClass('opened');
  }
  closeOverview(){
    $('#overview').removeClass('open');
    $('.leftSubNav').removeClass('open');
    $('#overlayProjectDetails').removeClass('opened');
  }
}
