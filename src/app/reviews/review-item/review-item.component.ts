import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../models/Review';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {
  @Input() review: Review;
  ratingvalues = [
    'Slecht',
    'Kan beter',
    'Gemiddeld',
    'Goed',
    'Zeer goed'
  ];
  constructor() { }

  ngOnInit() {
  }

}
