import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ServupService} from '../services/servup.service';
import {Service} from '../models/Service';
import {Review} from '../models/Review';
import {User} from '../models/User';
@Component({
  selector: 'app-service-profile',
  templateUrl: './service-profile.component.html',
  styleUrls: ['./service-profile.component.scss']
})
export class ServiceProfileComponent implements OnInit {
  serviceId;
  service: Service;
  user: User;
  reviews: Review[];
  reviewMeta;
  constructor(private route: ActivatedRoute, private location: Location, private serveUpService: ServupService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.serviceId = params['id'];
        this.serveUpService.getService(this.serviceId).subscribe(result => {
            this.service = result.service;
            this.user = result.service.user;
            this.serveUpService.getServiceReviews(this.service.id).subscribe(resultReviews => {
              this.reviews = resultReviews.reviews.data;
              this.reviewMeta = resultReviews.reviews.meta.pagination;
            });
          },
          error => {
            this.location.back();
          }
        );
      });
  }

  loadMoreReviews(page) {
    this.serveUpService.getServiceReviews(this.serviceId, page).subscribe(result => {
      this.reviews = this.reviews.concat(result.reviews.data);
      this.reviewMeta = result.reviews.meta.pagination;
    });
  }

}
