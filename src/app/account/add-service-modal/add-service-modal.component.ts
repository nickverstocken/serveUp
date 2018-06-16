import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Service} from '../../models/Service';
import {City} from '../../models/City';

@Component({
  selector: 'app-add-service-modal',
  templateUrl: './add-service-modal.component.html',
  styleUrls: ['./add-service-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddServiceModalComponent implements OnInit, OnChanges {
  @Input() show = false;
  @Input() loading = false;
  @Output() onclose: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
  selectedService = new Service();
  formService;
  step1;
  step2;
  step3;
  step4;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.buidFormService();
  }

  ngOnChanges() {

  }

  buidFormService() {
    this.selectedService = new Service();
    this.selectedService.max_km = 5;
    this.selectedService.city = new City();
    this.step1 = this.fb.group({
      name: [this.selectedService.name, Validators.required],
      logo: [this.selectedService.logo],
      banner: [this.selectedService.banner],
      address: [this.selectedService.address, Validators.required],

      city: this.fb.group({
        id: [this.selectedService.city.id, Validators.required],
        name: [this.selectedService.city.name, Validators.required],
        zip: [this.selectedService.city.zip, [Validators.required, Validators.minLength(4)]],
        lat: [this.selectedService.city.lat],
        lng: [this.selectedService.city.lng]
      }),
      tel: [this.selectedService.tel],
      experience: [this.selectedService.experience],
      website: [this.selectedService.website],
      social_networks: this.fb.array([])
    });
    this.step2 = this.fb.group({
      description: [this.selectedService.description, Validators.required],
      category_id: [this.selectedService.sub_category ? this.selectedService.sub_category.category.id : null],
      subcategory_id: [this.selectedService.sub_category, Validators.required],
      price_estimate: [this.selectedService.price_estimate, Validators.required],
      rate: [this.selectedService.rate, Validators.required],
      price_extras: this.fb.array([])
    });
    this.step3 = this.fb.group({
      business_hours: [this.selectedService.business_hours]
    });
    this.step4 = this.fb.group({
      max_km: [this.selectedService.max_km],
      city: this.step1.controls.city
    });
  }

  close() {
    this.onclose.emit();
  }

  addService() {
    this.formService = {
      ...this.step1.value,
      ...this.step2.value,
      ...this.step3.value,
      ...this.step4.value,
      city_id: this.step1.controls.city.controls.id.value
    };
    this.loading = true;
   this.onAdd.emit(this.formService);
  }
}
