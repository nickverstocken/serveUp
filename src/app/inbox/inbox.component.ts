import { Component, OnInit } from '@angular/core';
import {ServupService} from '../services/servup.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  selectedServiceId;
  offerList;
  filter;
  offerId;
  selectedOffer;
  constructor(private serveUpService: ServupService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    this.serveUpService.selectedService.subscribe(result => {
      if(this.selectedServiceId !== result){
        this.selectedServiceId = result;
      }

      this.route.params.subscribe(
        params => {
          if (this.filter !== params['filter']) {
              this.filter = params['filter'];
              this.getRequests(this.selectedServiceId);
            if(params['id']){
              this.offerId  = params['id'];
            }
          }else{
            this.router.navigate([`inbox/requests`]);
          }

          });
    });
  }
  filterRequests(val){
    this.router.navigate([`inbox/${val}`]);
  }
  getRequests(id){
    if(this.selectedServiceId !== -1){
      this.serveUpService.getServiceRequestList(id, this.filter).subscribe(result => {
        this.offerList = result.offers;
        console.log('getting requests');
      });
    }
  }
  changeSelected(offer){
   this.location.go(`inbox/${this.filter}/${offer.id}`);
  }
}
