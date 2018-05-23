import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ServupService} from '../services/servup.service';
import {AuthService} from '../services/auth.service';
import {User} from '../models/User';
import {EmailValidator} from '../custom-validation/email.validator';
import {Service} from '../models/Service';
import {ServiceTravelComponent} from './service-travel/service-travel.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit, AfterViewInit {
  user: User;
  disallowUpload = true;
  selectedService: Service;
  formuser;
  formService;
  cardEdit;
  @ViewChild('serviceTravel') serviceTravel: ServiceTravelComponent;
  constructor(private serveUpService: ServupService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(result => {
      if(result.id){
        this.user = result;
        this.buildFormUser();
      }
    });
  }
  ngAfterViewInit() {

  }
  buildFormUser(){
    this.formuser = this.fb.group({
      fname: [this.user.fname, Validators.required],
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email], EmailValidator.createValidator(this.serveUpService)],
      picture: [this.user.picture],
      address: [this.user.address, Validators.required],
      city: this.fb.group({
        id: [this.user.city_id, Validators.required],
        name: [this.user.city.name, Validators.required],
        zip: [this.user.city.zip, [Validators.required, Validators.minLength(4)]],
      }),
      introduction: [this.user.introduction]
    });
  }
  buidFormService(){
    this.formService = this.fb.group({
      name: [this.selectedService.name, Validators.required],
      description: [this.selectedService.description],
      logo: [this.selectedService.logo],
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
      business_hours: [this.selectedService.business_hours],
      max_km: [this.selectedService.max_km],
      price_estimate: [this.selectedService.price_estimate, Validators.required],
      rate: [this.selectedService.rate, Validators.required],
      price_extras: this.fb.array([]),
      category_id: [this.selectedService.category_id],
      tags: [this.selectedService.tags]
    });
  }
  userPictureLoad(file) {
    this.formuser.controls.picture.setValue(file.file);
  }
  cancelEditMode(formid, model){
    this[formid].reset(this[model]);
    this.cardEdit = undefined;
  }
  setService(service: Service) {
    const index = this.user.service.indexOf(service);
    this.selectedService = this.user.service[index];
    this.buidFormService();
    if(this.serviceTravel){
      this.serviceTravel.setLatLng(this.selectedService.city.lat, this.selectedService.city.lng);
    }

  }
}
