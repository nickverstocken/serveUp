import {Component, OnInit, AfterContentInit, ViewChild, AfterViewInit, HostListener} from '@angular/core';
import {ServupService} from '../services/servup.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {TabsComponent} from '../components/tabs/tabs.component';
import {ChatComponent} from '../components/chat/chat.component';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit, AfterContentInit, AfterViewInit {
  sub;
  selectedServiceId;
  offerList;
  filter;
  selectedOffer;
  messages;
  loadingMessages = true;
  user;
  requests;
  offerlistopened = true;
  mobile = false;
  innerWidth;
  @ViewChild('tabs') tabs: TabsComponent;
  @ViewChild('chatter') chatter: ChatComponent;

  constructor(private serveUpService: ServupService, private auth: AuthService, private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 680) {
      this.mobile = true;
    } else {
      this.mobile = false;
      this.offerlistopened = true;
    }
  }

  ngAfterViewInit() {


  }

  ngAfterContentInit() {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 680) {
      this.mobile = true;
    }
    this.auth.currentUser.subscribe(user => {
      if (user.id) {
        this.user = user;
        this.route.queryParams.subscribe(params => {
          this.messages = undefined;
          this.loadingMessages = true;
          this.selectedOffer = undefined;
          this.selectedServiceId = undefined;
          this.offerList = undefined;
          if (params.filter) {
            this.filter = params.filter;
          } else {
            this.filter = 'personal';
            if (user.role === 'service') {
              this.filter = 'requests';
            }
          }
          if (this.filter !== 'personal') {
            this.getServiceMessages();
          } else {
            this.getRequestMessages();
          }

        });

      }
    });

  }

  ngOnDestroy() {
  }

  getRequestMessages() {
    this.serveUpService.getAllOffers().subscribe(
      result => {
        this.offerList = result.offers;
        if (this.offerList.length > 0) {
          this.getOfferMessages(this.offerList[0].id);
        }
      });
  }

  getServiceMessages() {
    if (this.user.role === 'service') {
      this.serveUpService.selectedService.subscribe(data => {
        this.selectedServiceId = data;
        this.serveUpService.getServiceRequestList(this.selectedServiceId, this.filter).subscribe(result => {
          this.offerList = result.offers;
          if (this.offerList.length > 0) {
            this.getOfferMessages(this.offerList[0].id);
          }
        });
      });
    }
  }

  filterRequests(val) {
    if(this.mobile){
      this.offerlistopened = true;
    }
    this.filter = val;
    this.router.navigate(['/inbox'], {queryParams: {filter: val}});
  }

  receivedMessage(event) {
    let currentOffer = this.offerList.filter(offer => offer.id === event.message_id)[0];
    if (currentOffer) {
      currentOffer.latest_message = event;
    }

  }

  getOfferMessages(id) {
    this.loadingMessages = true;
    this.serveUpService.getMessages(id).subscribe(result => {
        this.messages = result.messages;
        this.selectedOffer = this.offerList.filter(offer => offer.id === parseInt(id, 10))[0];
      },
      error => {

      },
      () => {
        this.loadingMessages = false;
      });
  }

  sendOfferMessage(event) {
    const chatmessage = event.chatmessage;
    const index = event.index;

    this.serveUpService.sendMessage(this.selectedOffer.id, chatmessage).subscribe(result => {
      this.messages[index] = result.message;
      this.selectedOffer.latest_message = result.message;
    });
  }

  changeSelected(offer) {
    this.getOfferMessages(offer.id);
    if(this.mobile){
      this.offerlistopened = false;
    }

  }

  updateRequest(offer, status) {
    this.serveUpService.updateServiceRequest(this.selectedServiceId, offer.id, {'action': status}).subscribe(result => {
      if (result.success) {
        if (status === 'accept') {
          this.filterRequests('accepted');
        }
        if (status === 'decline') {
          this.offerList = this.offerList.filter(item => item !== offer);
        }
      }
    });
  }
  sendFiles(event){
    const index = event.index;
    this.serveUpService.saveAttachements(this.selectedOffer.id, event.files).subscribe(result => {
      this.messages.push(result.message);
    });
  }
  sendAppointment(event) {
    const appointment = event.appointment;
    appointment.offer_id = this.selectedOffer.id;
    const index = event.index;
    this.serveUpService.saveAppointMent(appointment).subscribe(result => {
      this.messages[index] = result.message;
    });
  }
  sendPriceOffer(event){
    const priceOffer = event.priceoffer;
    const index = event.index;
    this.serveUpService.sendPriceOffer(this.selectedOffer.id, priceOffer).subscribe(result => {
      this.messages[index] = result.message;
    });
  }
  actionAppointment(event) {
    const appointment = JSON.parse(event.message.message);
    switch (event.action) {
      case 'cancelOwn':
        this.serveUpService.deleteAppointment(appointment.id, {
          'offer_id': event.message.message_id,
          'receiver_id': event.message.receiver_id,
          'message_id': event.message.id
        }).subscribe(
          result => {
            this.getOfferMessages(this.selectedOffer.id);
          });
        break;
      case 'canceled':
        this.serveUpService.deleteAppointment(appointment.id, {
          'offer_id': event.message.message_id,
          'receiver_id': event.message.sender_id,
          'message_id': event.message.id
        }).subscribe(
          result => {
            this.getOfferMessages(this.selectedOffer.id);
          });
        break;
      case 'approved':
        this.serveUpService.acceptAppointment(appointment.id, {
          'offer_id': event.message.message_id,
          'receiver_id': event.message.sender_id,
          'message_id': event.message.id
        }).subscribe(
          result => {
            this.getOfferMessages(this.selectedOffer.id);
          });
        break;
    }
  }

  actionPriceOffer(event){
    const priceOffer = JSON.parse(event.message.message);
    switch (event.action){
      case 'cancelOwn':
        this.serveUpService.actionPriceOffer(this.selectedOffer.id, {'receiver_id': event.message.receiver_id, 'message_id': event.message.id, 'action': 'geannuleerd'}).subscribe(
          result => {
            this.getOfferMessages(this.selectedOffer.id);
          });
        break;
      case 'canceled':
        this.serveUpService.actionPriceOffer(this.selectedOffer.id, {'receiver_id': event.message.sender_id, 'message_id': event.message.id, 'action': 'geweigerd'}).subscribe(
          result => {
            this.getOfferMessages(this.selectedOffer.id);
          });
        break;
      case 'approved':
                this.serveUpService.actionPriceOffer(this.selectedOffer.id, {'receiver_id': event.message.sender_id, 'message_id': event.message.id, 'action': 'geaccepteerd', 'price' : priceOffer.price, 'rate' : priceOffer.rate}).subscribe(
                  result => {
                    const index = this.offerList.indexOf(this.selectedOffer);
                    this.offerList[index].price_offer = priceOffer.price;
                    this.offerList[index].rate = priceOffer.rate;
                    this.getOfferMessages(this.selectedOffer.id);
                  });
        break;
    }
  }

  reloadMessages(message) {
    if(message.type === 'price'){
      const priceOffer = JSON.parse(message.message);
      if(priceOffer.approved) {
        const index = this.offerList.indexOf(this.selectedOffer);
        this.offerList[index].price_offer = priceOffer.price;
        this.offerList[index].rate = priceOffer.rate;
      }
    }
    this.getOfferMessages(this.selectedOffer.id);
  }

  closeOverview() {

  }

  toggleOfferlist() {
      this.offerlistopened ? this.offerlistopened = false : this.offerlistopened = true;
  }
}
