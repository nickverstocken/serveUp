import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ServupService} from '../services/servup.service';
import {AuthService} from '../services/auth.service';
import {User} from '../models/User';
import {EmailValidator} from '../custom-validation/email.validator';
import {Service} from '../models/Service';
import {ServiceTravelComponent} from './service-travel/service-travel.component';
import {ServiceDetailsComponent} from './service-details/service-details.component';
import {ServicePriceComponent} from './service-price/service-price.component';

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
  services = [];
  showServiceAdd = false;
  @ViewChild('serviceTravel') serviceTravel: ServiceTravelComponent;
  @ViewChild('servicePrice') servicePrice: ServicePriceComponent;
  @ViewChild('serviceDetail') serviceDetail: ServiceDetailsComponent;
  constructor(private serveUpService: ServupService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.cardEdit = 'service-details';
    this.authService.currentUser.subscribe(result => {
      if(result.id){
        this.user = result;
        Object.assign(this.services, this.user.service);
        this.buildFormUser();
      }
    });
  }
  ngAfterViewInit() {

  }
  saveUser(id) {
    const frmData = this.assignFormData(this.formuser.value);
    frmData.append('city_id', this.formuser.controls.city.controls.id.value);
    this.serveUpService.updateUser(frmData).subscribe(
      result => {
        if(result.success){
          this.cardEdit = '';
          Object.assign(this.user, result.user);
        }
      },
      (error) => {
        /*this.handleErrors(id, error);*/
      }
    );
  }

  saveService() {
    let frmData = this.assignFormData(this.formService.value);
    frmData.append('city_id', this.formService.controls.city.controls.id.value);
    this.serveUpService.updateService(this.selectedService.id, frmData).subscribe(
      result => {
        Object.assign(this.selectedService, result.service);
      }
    );
  }
  addService(service){
    let frmData = this.assignFormData(service);
    this.serveUpService.addService(frmData).subscribe(result => {
     this.user.service.push(result.service);
     this.services.push(result.service);
     this.serveUpService.serviceAddedSubj.next(result.service);
     this.serveUpService.setSelectedService(result.service.id);
     this.showServiceAdd = false;

    });
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
      description: [this.selectedService.description, Validators.required],
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
      social_networks: this.fb.array([]),
      business_hours: [this.selectedService.business_hours],
      max_km: [this.selectedService.max_km],
      price_estimate: [this.selectedService.price_estimate, Validators.required],
      rate: [this.selectedService.rate, Validators.required],
      price_extras: this.fb.array([]),
      subcategory_id: [this.selectedService.sub_category ? this.selectedService.sub_category.id : null],
      category_id: [this.selectedService.sub_category  ? this.selectedService.sub_category.category.id : null]
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
    this.selectedService = service;
    this.buidFormService();
    if(this.serviceTravel){
      this.serviceTravel.setLatLng(this.selectedService.city.lat, this.selectedService.city.lng);
    }
    if(this.servicePrice){
      if (this.selectedService.price_extras) {
        for (let price_extra of this.selectedService.price_extras) {
          this.servicePrice.addPriceExtra(price_extra);
        }
      }
    }
    if(this.serviceDetail){
      if(this.selectedService.social_networks){
        for (let social of this.selectedService.social_networks) {
          this.serviceDetail.addSocialNetwork(social);
        }
      }
    }
  }
  assignFormData(model) {
    const frmData = new FormData();
    for (const key of Object.keys(model)) {
      if(model[key]){
        if(model[key] instanceof Object && Object.keys(model[key]).length > 0){
          model[key] = JSON.stringify(model[key]);

        }

        frmData.append(key, model[key]);
      }

    }
    return frmData;
  }
  showAddService(){
    this.showServiceAdd = true;
  }
}
