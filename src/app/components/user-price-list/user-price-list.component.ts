import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-price-list',
  templateUrl: './user-price-list.component.html',
  styleUrls: ['./user-price-list.component.scss']
})
export class UserPriceListComponent implements OnInit {
  @Input() offerList: any;
  @Input() currentSelected: number;
  @Output() changeSelectedOffer: EventEmitter<any> = new EventEmitter<any>();
  constructor(private router: Router) { }

  ngOnInit() {
  }
  changeSelected(offer){
    this.currentSelected = offer.id;
    this.changeSelectedOffer.emit(offer.id);
  }
}
