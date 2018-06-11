import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Review} from '../models/Review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() reviews: Review[];
  @Input() meta;
  @Output() loadmore: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {

  }
  loadMore(){
    let nextpage;
    if(this.meta.total_pages !== this.meta.current_page){
      nextpage = this.meta.current_page + 1;
    }else{
      nextpage = this.meta.current_page
    }
    this.loadmore.emit(nextpage);
  }
}
