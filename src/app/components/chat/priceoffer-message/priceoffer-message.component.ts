import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-priceoffer-message',
  templateUrl: './priceoffer-message.component.html',
  styleUrls: ['./priceoffer-message.component.scss']
})
export class PriceofferMessageComponent implements OnInit {
  @Input() message;
  @Input() creator;
  @Output() onCancelPriceOffer: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancelOwnPriceOffer: EventEmitter<any> = new EventEmitter<any>();
  @Output() onApprovePriceOffer: EventEmitter<any> = new EventEmitter<any>();
  priceOffer;
  constructor() { }

  ngOnInit() {
    this.priceOffer = JSON.parse(this.message.message);
  }
  cancelPriceoffer(id){
    this.onCancelPriceOffer.emit(this.message);
  }
  approvePriceoffer(id){
    this.onApprovePriceOffer.emit(this.message);
  }
  cancelOwnPriceoffer(id){
    this.onCancelOwnPriceOffer.emit(this.message);
  }
}
