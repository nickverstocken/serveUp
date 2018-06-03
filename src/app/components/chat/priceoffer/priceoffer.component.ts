import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-priceoffer',
  templateUrl: './priceoffer.component.html',
  styleUrls: ['./priceoffer.component.scss']
})
export class PriceofferComponent implements OnInit {
  @Input() show = false;
  @Output() closePriceOffer: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendPriceOffer: EventEmitter<any> = new EventEmitter<any>();
  mobile = false;
  formPriceOffer;
  innerWidth;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    }
    this.formPriceOffer = this.fb.group({
      price: [null, Validators.required],
      rate: [null, Validators.required]
    });
  }
  onsendPriceOffer(){
    this.sendPriceOffer.emit(this.formPriceOffer);
  }
}
