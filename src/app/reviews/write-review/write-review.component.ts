import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Media} from '../../models/Media';
import {ServupService} from '../../services/servup.service';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  @Input() show;
  @Input() title;
  @Input() service;
  @Input() fromuser;
  @Input() offerId;
  @Input() user;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();
  @Output() reviewSuccess: EventEmitter<any> = new EventEmitter<any>();
  hovered = 0;
  lastRating = 0;
  ratingSet = false;
  currentRatingValue;
  ratingvalues = [
    'Slecht',
    'Kan beter',
   'Gemiddeld',
    'Goed',
    'Zeer goed'
  ];
  reviewText = '';
  constructor(private serveUpService: ServupService) {
  }

  ngOnInit() {
  }

  close() {
    this.closePopup.emit();
  }

  setHovered(hovered: number) {
      this.hovered = hovered;
      this.currentRatingValue = this.ratingvalues[hovered - 1];
  }

  resetRating() {
    if(!this.ratingSet){
      this.hovered = 0;
    }
    this.hovered = this.lastRating;
    this.currentRatingValue = this.ratingvalues[this.hovered - 1];
  }
  setRating(hovered: number){
    this.hovered = hovered;
    this.lastRating = hovered;
    this.currentRatingValue = this.ratingvalues[this.hovered - 1];
    this.ratingSet = true;
  }
  saveReview(){
    const frmData = new FormData();
    frmData.append('rating', this.lastRating.toString());
    frmData.append('review', this.reviewText);
    this.serveUpService.saveReview(this.offerId, frmData).subscribe(result => {
      this.reviewSuccess.emit(result.review);
    });
  }
}
