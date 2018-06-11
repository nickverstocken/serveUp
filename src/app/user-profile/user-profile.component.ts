import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ServupService} from '../services/servup.service';
import {User} from '../models/User';
import {Review} from '../models/Review';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userId;
  user: User;
  reviews: Review[];
  reviewMeta;
  constructor(private route: ActivatedRoute, private serveUpService: ServupService, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.userId = params['id'];
        this.serveUpService.getUser(this.userId).subscribe(result => {
          this.user = result.user;
          this.serveUpService.getUserReviews(this.user.id).subscribe(resultReviews => {
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
    this.serveUpService.getUserReviews(this.user.id, page).subscribe(result => {
      this.reviews = this.reviews.concat(result.reviews.data);
      this.reviewMeta = result.reviews.meta.pagination;
    });
  }

}
