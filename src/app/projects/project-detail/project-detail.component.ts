import {Component, HostListener, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServupService} from '../../services/servup.service';
import {Service} from '../../models/Service';
import {AuthService} from '../../services/auth.service';
import {Review} from '../../models/Review';

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
  chatterOpen = false;
  loading = true;
  currentOffer;
  reviews: Review[];
  reviewMeta;
  showReviewPop = false;
  user;

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
      if (user.id) {
        this.user = user;
        this.route.params.subscribe(
          params => {
            if (this.currentRequest !== params['id']) {
              this.currentRequest = params['id'];
              this.serveUpService.getRequest(params['id']).subscribe(result => {
                  this.currentSelected = params['offerid'] || result.request.offers[0].id;
                  this.offerlist = result.request.offers;
                  if(!params['offerid']){
                    this.getSelectedOffer(this.currentSelected);
                  }else{
                    this.getSelectedOffer(params['offerid']);
                  }
                },
                error => {
                  if (error.status === 404) {
                    this.router.navigate(['projects']);
                  }
                });
            }
          });
      }else{

      }
    });

  }
  markMessagesAsRead(id){
    this.serveUpService.markMessagesAsRead(id).subscribe(result => {

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
        this.currentOffer = result.offer;
        this.getOfferMessages(id);
        this.getServiceReviews(this.currentService.id);
        this.markMessagesAsRead(id);
      },
      error => {
        if (error.status === 404) {
          this.router.navigate(['projects']);
        }
      });
  }

  getServiceReviews(id) {
    this.serveUpService.getServiceReviews(id).subscribe(result => {
      this.reviews = result.reviews.data;
      this.reviewMeta = result.reviews.meta.pagination;
    });
  }

  loadMoreReviews(page) {
    this.serveUpService.getServiceReviews(this.currentService.id, page).subscribe(result => {
      this.reviews = this.reviews.concat(result.reviews.data);
      this.reviewMeta = result.reviews.meta.pagination;
    });
  }

  getOfferMessages(id) {
    this.serveUpService.getMessages(id).subscribe(result2 => {
      this.messages = result2.messages;
      this.loading = false;
    });
  }

  sendMessage(event) {
    const chatmessage = event.chatmessage;
    const index = event.index;
    this.serveUpService.sendMessage(this.currentSelected, chatmessage).subscribe(result => {
      this.messages[index] = result.message;
    });
  }

  changeSelected(offerid) {
    this.closeOverview();
    this.currentSelected = offerid;
    this.router.navigate(['project/' + this.currentRequest + '/offer/' + this.currentSelected]);
    this.getSelectedOffer(this.currentSelected);
  }

  toggleUserPriceList() {
    this.pricelistopened = true;
    $('#overview').toggleClass('open');
    $('.leftSubNav').toggleClass('open');
    $('#overlayProjectDetails').toggleClass('opened');
  }

  openChatter() {
    this.chatterOpen = true;
  }

  closeChatter() {
    this.chatterOpen = false;
  }

  closeOverview() {
    this.pricelistopened = false;
    $('#overview').removeClass('open');
    $('.leftSubNav').removeClass('open');
    $('#overlayProjectDetails').removeClass('opened');
  }

  sendAppointment(event) {
    const appointment = event.appointment;
    appointment.offer_id = this.currentSelected;
    const index = event.index;
    this.serveUpService.saveAppointMent(appointment).subscribe(result => {
      this.messages[index] = result.message;
    });
  }

  sendPriceOffer(event) {
    const priceOffer = event.priceoffer;
    const index = event.index;
    this.serveUpService.sendPriceOffer(this.currentSelected, priceOffer).subscribe(result => {
      this.messages[index] = result.message;
    });
  }

  sendFiles(event) {
    const index = event.index;
    this.serveUpService.saveAttachements(this.currentSelected, event.files).subscribe(result => {
      this.messages.push(result.message);
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
            this.getOfferMessages(this.currentSelected);
          });
        break;
      case 'canceled':
        this.serveUpService.deleteAppointment(appointment.id, {
          'offer_id': event.message.message_id,
          'receiver_id': event.message.sender_id,
          'message_id': event.message.id
        }).subscribe(
          result => {
            this.getOfferMessages(this.currentSelected);
          });
        break;
      case 'approved':
        this.serveUpService.acceptAppointment(appointment.id, {
          'offer_id': event.message.message_id,
          'receiver_id': event.message.sender_id,
          'message_id': event.message.id
        }).subscribe(
          result => {
            this.getOfferMessages(this.currentSelected);
          });
        break;
    }
  }

  actionPriceOffer(event) {
    const priceOffer = JSON.parse(event.message.message);
    switch (event.action) {
      case 'cancelOwn':
        this.serveUpService.actionPriceOffer(this.currentSelected, {
          'receiver_id': event.message.receiver_id,
          'message_id': event.message.id,
          'action': 'geannuleerd'
        }).subscribe(
          result => {
            this.getOfferMessages(this.currentSelected);
          });
        break;
      case 'canceled':
        this.serveUpService.actionPriceOffer(this.currentSelected, {
          'receiver_id': event.message.sender_id,
          'message_id': event.message.id,
          'action': 'geweigerd'
        }).subscribe(
          result => {
            this.getOfferMessages(this.currentSelected);
          });
        break;
      case 'approved':

        this.serveUpService.actionPriceOffer(this.currentSelected, {
          'receiver_id': event.message.sender_id,
          'message_id': event.message.id,
          'action': 'geaccepteerd',
          'price': priceOffer.price,
          'rate': priceOffer.rate
        }).subscribe(
          result => {
            let offer = this.offerlist.filter(item => item.id == this.currentSelected)[0];
            offer.price_offer = priceOffer.price;
            offer.rate = priceOffer.rate;
            this.currentOffer = offer;
            this.currentOffer.price_offer = priceOffer.price;
            this.currentOffer.rate = priceOffer.rate;
            this.getOfferMessages(this.currentSelected);
          });
        break;
    }
  }

  reloadMessages(message) {
    if (message.type === 'price') {
      const priceOffer = JSON.parse(message.message);
      if (priceOffer.approved) {
        const index = this.offerlist.indexOf(this.offerlist.filter(o => o.id === this.currentOffer.id)[0]);
        this.offerlist[index].price_offer = priceOffer.price;
        this.offerlist[index].rate = priceOffer.rate;
      }

    }
    this.getOfferMessages(this.currentSelected);
  }

  hireService() {
    this.serveUpService.hireOfferService(this.currentSelected).subscribe(result => {
      let offer = this.offerlist.filter(item => item.id == this.currentSelected)[0];
      offer = result.offer;
      this.currentOffer = offer;
    });
  }

  writeReview() {
    this.showReviewPop = true;
  }

  reviewSucces(event) {
    this.currentService.number_ratings += 1;
    this.currentOffer.service_reviewed = 1;
    const review = new Review();
    review.comment = event.comment;
    review.rating = event.score;
    review.reviewer = this.user;
    review.id = event.id;
    this.reviews.unshift(review);
  }
}
