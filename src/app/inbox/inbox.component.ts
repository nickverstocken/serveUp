import {Component, OnInit} from '@angular/core';
import {ServupService} from '../services/servup.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {Appointment} from '../models/Appointment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  sub;
  selectedServiceId;
  offerList;
  filter;
  selectedOffer;
  messages;

  constructor(private serveUpService: ServupService,private auth: AuthService, private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      if(user.id){
        this.route.params.subscribe(
          params => {
            this.selectedServiceId = params['serviceid'];
            this.serveUpService.setSelectedService(this.selectedServiceId);
            if (!this.filter) {
              this.filter = params['filter'];
            }
            this.getRequests(this.selectedServiceId, params['filter']);
            if (params['id']) {
              this.getOfferMessages(params['id']);
            }
          });
        this.sub = this.serveUpService.selectedService.subscribe(result => {
          if (this.selectedServiceId !== result) {
            this.router.navigate([`inbox/${result}/${this.filter}`]);
          }
        });
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.filter = '';
  }

  filterRequests(val) {
    this.filter = val;
    this.selectedOffer = undefined;
    this.router.navigate([`inbox/${this.selectedServiceId}/${val}`]);
  }

  getRequests(id, filter) {
    if (this.selectedServiceId !== -1) {
      this.serveUpService.getServiceRequestList(id, filter).subscribe(result => {
        this.offerList = result.offers;
      });
    }
  }

  getOfferMessages(id) {
    if (this.selectedServiceId !== -1) {
      this.serveUpService.getMessages(id).subscribe(result => {
          this.messages = result.messages;
          this.selectedOffer = this.offerList.filter(offer => offer.id === parseInt(id, 10))[0];
        },
        error => {
          if (error.status === 404) {
            let navigation = '';
            this.selectedOffer = undefined;
            if (this.offerList.length > 0) {
              navigation = `inbox/${this.selectedServiceId}/${this.filter}/${this.offerList[0].id}`;
            } else {
              navigation = `inbox/${this.selectedServiceId}/${this.filter}`;
            }
            this.router.navigate([navigation]);
          }
        });
    }
  }
  sendOfferMessage(event){
    const chatmessage = event.chatmessage;
    const index = event.index;
    this.serveUpService.sendMessage(this.selectedOffer.id, chatmessage).subscribe(result => {
      this.messages[index] = result.message;
    });
  }
  changeSelected(offer) {

    this.location.go(`inbox/${this.selectedServiceId}/${this.filter}/${offer.id}`);
    this.getOfferMessages(offer.id);

  }
  updateRequest(offer, status){
    this.serveUpService.updateServiceRequest(this.selectedServiceId, offer.id, {'action': status}).subscribe(result => {
        if(result.success){
          if(status === 'accept'){
            this.router.navigate([`inbox/${this.selectedServiceId}/accepted/${result.offer.id}`]);
          }
          if(status === 'decline'){
            this.offerList = this.offerList.filter(item => item !== offer);
          }
        }
    });
  }
  sendAppointment(appointment: Appointment){
    appointment.offer_id = this.selectedOffer.id;
    this.serveUpService.saveAppointMent(appointment).subscribe(result => {
      console.log(result);
    });
  }
}
