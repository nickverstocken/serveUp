import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../models/Service';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-service-price',
  templateUrl: './service-price.component.html',
  styleUrls: ['./service-price.component.scss']
})
export class ServicePriceComponent implements OnInit {
  @Input() service: Service;
  @Input() formservice;
  @Input() editting = false;
  @Output() saveService: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    for (let price_extra of this.service.price_extras) {
      this.addPriceExtra(price_extra);
    }
  }

  cancelEdit() {
    this.editting = false;
    this.rebuildForm();
  }

  save() {
    this.editting = false;
    this.saveService.emit();
  }

  rebuildForm() {
    this.resetPrice();
    this.formservice.reset(this.service);
  }

  addPriceExtra(value = null) {
    console.log(value);
    if (!value) {
      value = {name: '', price: ''};
    }
    const control = <FormArray>this.formservice.controls['price_extras'];
    const addrCtrl = this.initPriceExtra(value);
    control.push(addrCtrl);
    console.log(this.formservice.controls.price_extras.controls);
  }

  initPriceExtra(value) {
    return this.fb.group({
      name: [value.name, Validators.required],
      price: [value.price, Validators.required]
    });
  }

  removePriceExtra(index) {
    const control = <FormArray>this.formservice.controls['price_extras'];
    control.removeAt(index);
  }

  resetPrice() {
    const control = <FormArray>this.formservice.controls['price_extras'];
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i);
    }

    if (this.service.price_extras) {
      for (const price_extra of this.service.price_extras) {

        this.addPriceExtra(price_extra);
      }
    }

  }
}
