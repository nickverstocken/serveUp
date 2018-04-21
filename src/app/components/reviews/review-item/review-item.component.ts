import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.scss']
})
export class ReviewItemComponent implements OnInit {
reviewText;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.reviewText = $('.reviewText').text();

    const text = this.truncString(this.reviewText, 200, '...');
    $('.reviewText').text(text);
  }
  truncString(str, max, add) {
    add = add || '...';
    return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
  }
  readMore(){

  }
}
