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
import {ActivatedRoute, Router} from '@angular/router';
import {Review} from '../models/Review';
import {ProfileComponent} from '../components/profile/profile.component';
import {ToastServiceService} from '../services/toast-service.service';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit, AfterViewInit {
  user: User;
  selectedService: Service;
  formuser;
  formchangePass;
  formService;
  cardEdit;
  services = [];
  showServiceAdd = false;
  subnav;
  userReviews: Review[];
  serviceReviews: Review[];
  userMeta;
  serviceMeta;
  loadingadd = true;
  @ViewChild('serviceTravel') serviceTravel: ServiceTravelComponent;
  @ViewChild('servicePrice') servicePrice: ServicePriceComponent;
  @ViewChild('serviceDetail') serviceDetail: ServiceDetailsComponent;
  @ViewChild('userProfile') userProfile: ProfileComponent;
  @ViewChild('serviceProfile') serviceProfile: ProfileComponent;
  constructor(private snackbar: ToastServiceService, private serveUpService: ServupService, private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    this.cardEdit = 'service-details';
    this.authService.currentUser.subscribe(result => {
      if(result.id){
        this.user = result;
        Object.assign(this.services, this.user.service);
        this.buildFormUser();
        this.route.params.subscribe(param => {
          this.subnav = param.subnav;
          if(!this.subnav){
            this.subnav = 'personal';
          }
          if((this.subnav === 'service' || this.subnav === 'service-profile') && this.user.role === 'user'){
            this.router.navigate(['/account/personal']);
          }
          if(this.subnav === 'personal-profile'){
            this.getUserReviews();
          }
        });
      }else{
        this.authService.populate();
      }
    });
  }
  ngAfterViewInit() {

  }
  saveUser() {
    const frmData = this.assignFormData(this.formuser.value);
    frmData.append('city_id', this.formuser.controls.city.controls.id.value);
    this.serveUpService.updateUser(frmData).subscribe(
      result => {
        if(result.success){
          this.cardEdit = '';
          Object.assign(this.user, result.user);
          this.snackbar.sendNotification('Data succesvol opgeslagen!', 'Ok');
        }
      },
      (error) => {
        this.snackbar.sendNotification('Er is iets misgelopen!', 'Ok');
      }
    );
  }

  saveService() {
    const frmData = this.assignFormData(this.formService.value);
    frmData.append('city_id', this.formService.controls.city.controls.id.value);
    this.serveUpService.updateService(this.selectedService.id, frmData).subscribe(
      result => {
        Object.assign(this.selectedService, result.service);
        this.snackbar.sendNotification('Data succesvol opgeslagen!', 'Ok');
      },
      (error) => {
        this.snackbar.sendNotification('Er is iets misgelopen!', 'Ok');
      }
    );
  }
  deleteService(service) {
    this.serveUpService.deleteService(service.id).subscribe(result => {
      this.snackbar.sendNotification('Service succesvol verwijderd!');
        this.services = this.services.filter(item =>  result.service.id !== item.id);
      this.user.service = this.user.service.filter(item =>  result.service.id !== item.id);
        if(this.user.service.length > 0){
          this.selectedService = this.user.service[0];
          this.serveUpService.setSelectedService(this.user.service[0].id);
        }
      this.serveUpService.serviceDeletedSubj.next(result.service);
    },
      error => {
        this.snackbar.sendNotification('Er ging iets mis bij het verwijderen...', 'Ok');
      });
  }
  changePassword(){
    const frmData = this.assignFormData(this.formchangePass.value);
    this.serveUpService.changePass(frmData).subscribe(
      result => {
      });
  }

  addService(service){
    let frmData = this.assignFormData(service);
    this.loadingadd = true;
    this.serveUpService.addService(frmData).subscribe(result => {
     this.user.service.push(result.service);
     this.services.push(result.service);
     this.selectedService = result.service;
     this.serveUpService.serviceAddedSubj.next(result.service);
     this.serveUpService.setSelectedService(result.service.id);
     this.showServiceAdd = false;
    },
      error => {
      this.showServiceAdd = false;
      this.loadingadd = false;
      this.snackbar.sendNotification('Er ging iets mis probeer het later opnieuw...');
      },
      () => {
        this.showServiceAdd = false;
        this.loadingadd = false;
        this.snackbar.sendNotification('Service succesvol toegevoegd!');
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
        name: [this.user.city.name, [Validators.required], ],
        zip: [this.user.city.zip, [Validators.required, Validators.minLength(4)]],
        lat: [this.user.city.lat],
        lng: [this.user.city.lng]
      }),
      introduction: [this.user.introduction],
    });
    this.formchangePass = this.fb.group({
      password: [null,  Validators.required],
      new_password: [null,  [Validators.required, Validators]],
      new_password_confirmation: [null,  [Validators.required]]
    });
  }
  buidFormService(){
    if(this.selectedService){
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

  }

  setService(service: Service) {
    this.selectedService = service;
    this.buidFormService();

      this.getServiceReviews();

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
  upgradeAccount(){

  }
  loadMoreUserReviews(page){
    this.serveUpService.getUserReviews(this.user.id, page).subscribe(result => {
      this.userReviews = this.userReviews.concat(result.reviews.data);
      this.userMeta = result.reviews.meta.pagination;
    });
  }
  loadMoreServiceReviews(page){
    this.serveUpService.getServiceReviews(this.selectedService.id, page).subscribe(result => {
      this.serviceReviews = this.serviceReviews.concat(result.reviews.data);
      this.serviceMeta = result.reviews.meta.pagination;
    });
  }
  getServiceReviews(){
    this.serveUpService.getServiceReviews(this.selectedService.id).subscribe(resultReviews => {
      this.serviceReviews = resultReviews.reviews.data;
      this.serviceMeta = resultReviews.reviews.meta.pagination;
    });
  }
  getUserReviews(){
    this.serveUpService.getUserReviews(this.user.id).subscribe(resultReviews => {
      this.userReviews = resultReviews.reviews.data;
      this.userMeta = resultReviews.reviews.meta.pagination;
    });
  }
  goToUserReviews(){
    this.router.navigate(['/account/personal-profile']);
  }
  goToServiceReviews(){
    this.router.navigate(['/account/service-profile']);
  }
}
