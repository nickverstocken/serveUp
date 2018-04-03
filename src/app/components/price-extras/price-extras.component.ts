import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-price-extras',
  templateUrl: './price-extras.component.html',
  styleUrls: ['./price-extras.component.scss']
})
export class PriceExtrasComponent implements OnInit {
  @Input('group')
  public priceExtra: FormGroup;
  @Input() index: number;
  @Input() disabled: boolean;
  @Output() onRemovePriceExtra: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {

  }
  removePriceExtra(){
    this.onRemovePriceExtra.emit(this.index);
  }
}
