import {Component, OnInit, AfterContentInit, ViewChild} from '@angular/core';
import {ServupService} from '../services/servup.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {TabsComponent} from '../components/tabs/tabs.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit, AfterContentInit {
  sub;
  selectedServiceId;
  offerList;
  filter;
  selectedOffer;
  messages;
  @ViewChild('tabs') tabs: TabsComponent;
  constructor(private serveUpService: ServupService, private auth: AuthService, private route: ActivatedRoute, private router: Router, private location: Location) {
  }
  ngAfterContentInit(){
    this.tabs.current = this.route.snapshot.params['filter'];
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
              this.tabs.current = this.filter;
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
  sendAppointment(event){
   const appointment =  event.appointment;
   appointment.offer_id = this.selectedOffer.id;
    const index = event.index;
    this.serveUpService.saveAppointMent(appointment).subscribe(result => {
      this.messages[index] = result.message;
    });
  }
  actionAppointment(event){
    const appointment = JSON.parse(event.message.message);
    switch (event.action){
      case 'cancelOwn':
        this.serveUpService.deleteAppointment(appointment.id, {'offer_id': event.message.message_id, 'receiver_id': event.message.receiver_id, 'message_id': event.message.id}).subscribe(
          result => {
            this.getOfferMessages(this.selectedOffer.id);
          });
        break;
      case 'canceled':
        this.serveUpService.deleteAppointment(appointment.id, {'offer_id': event.message.message_id, 'receiver_id': event.message.sender_id, 'message_id': event.message.id}).subscribe(
          result => {
            this.getOfferMessages(this.selectedOffer.id);
          });
        break;
      case 'approved':
        this.serveUpService.acceptAppointment(appointment.id, {'offer_id': event.message.message_id, 'receiver_id': event.message.sender_id, 'message_id': event.message.id}).subscribe(
          result => {
            this.getOfferMessages(this.selectedOffer.id);
          });
        break;
    }
  }
  reloadMessages(message){
    this.getOfferMessages(this.selectedOffer.id);
  }
}
