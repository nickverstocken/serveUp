import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {User} from '../../models/User';
import {Service} from '../../models/Service';
import {Router} from '@angular/router';
import {Review} from '../../models/Review';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  @Input() service: Service;
  @Input() reviews: Review[];
  @Input() reviewMeta;
  @Output() loadmoreReviews: EventEmitter<any> = new EventEmitter<any>();
  ratingvalues = [
    'Slecht',
    'Kan beter',
    'Gemiddeld',
    'Goed',
    'Zeer goed'
  ];
  constructor(private router: Router) {
  }

  ngOnInit() {
  }
  srcollToReviews(){
    const element = document.querySelector('#reviews');
    element.scrollIntoView({behavior: 'smooth'});
  }
  loadMore(page){
    this.loadmoreReviews.emit(page);
  }
}
