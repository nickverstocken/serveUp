import {Component, OnInit} from '@angular/core';
import {ServupService} from '../services/servup.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

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

  constructor(private serveUpService: ServupService, private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.sub = this.serveUpService.selectedService.subscribe(result => {
          if (result !== this.selectedServiceId) {
            this.selectedServiceId = result;
          }
          if (!this.filter) {
            this.filter = params['filter'];
          }
          this.getRequests(this.selectedServiceId, params['filter']);
          if (params['id']) {
            this.getOfferMessages(params['id']);
          }
        });
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  filterRequests(val) {
    this.filter = val;
    this.router.navigate([`inbox/${val}`]);
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
      this.serveUpService.getServiceRequestMessages(this.selectedServiceId, id).subscribe(result => {
          this.messages = result.messages;
          this.selectedOffer = this.offerList.filter(offer => offer.id === parseInt(id, 10))[0];
        },
        error => {
          if (error.status === 404) {
            let navigation = '';
            this.selectedOffer = undefined;
            if (this.offerList.length > 0) {
              navigation = `inbox/${this.filter}/${this.offerList[0].id}`;
            } else {
              navigation = `inbox/${this.filter}`;
            }
            this.router.navigate([navigation]);
          }
        });
    }
  }

  changeSelected(offer) {
    this.location.go(`inbox/${this.filter}/${offer.id}`);
    this.getOfferMessages(offer.id);

  }
}
