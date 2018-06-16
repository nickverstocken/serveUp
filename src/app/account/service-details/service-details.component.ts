import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Service} from '../../models/Service';
import {ServupService} from '../../services/servup.service';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceDetailsComponent implements OnInit {
  @Input() service: Service;
  @Input() formservice;
  @Input() editting = false;
  @Input() showActions = true;
  @Output() saveService: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteService: EventEmitter<any> = new EventEmitter<any>();
  @Output() goToServiceReviews: EventEmitter<any> = new EventEmitter<any>();
  showSocialAdd = false;
  socialNetworks = ['facebook', 'twitter', 'linkedin', 'dribbble', 'instagram', 'youtube'];
  ratingvalues = [
    'Slecht',
    'Kan beter',
    'Gemiddeld',
    'Goed',
    'Zeer goed'
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if(this.service.social_networks){
      for (let social of this.service.social_networks) {
        this.addSocialNetwork(social);
      }
    }

  }
  delete(){
    const r = confirm(`Weet u zeker dat u ${this.service.name} wilt verwijderen?`);
    if (r === true) {
      this.deleteService.emit(this.service);
    }

  }
  cancelEdit(){
    this.editting = false;

    this.rebuildForm();
  }
  save(){
    this.editting = false;
    this.saveService.emit();
  }
  rebuildForm() {
    this.formservice.reset(this.service);
    this.formservice.controls.banner.setValue(this.service.banner);
    this.formservice.controls.logo.setValue(this.service.logo);
  }
  serviceLogoUploaded(file) {
    this.formservice.controls.logo.setValue(file.file);
  }
  serviceLBannerUploaded(file){
    this.formservice.controls.banner.setValue(file.file);
  }
  addSocialNetwork(value = null) {
    if (!value) {
      value = {name: '', url: ''};
    }
    const control = <FormArray>this.formservice.controls['social_networks'];
    const addrCtrl = this.initSocialNetwork(value);
    control.push(addrCtrl);
  }

  initSocialNetwork(value) {
    return this.fb.group({
      name: [value.name, Validators.required],
      url: [value.url, Validators.required]
    });
  }

  removeSocialNetwork(index) {
    const control = <FormArray>this.formservice.controls['social_networks'];
    control.removeAt(index);
  }

  resetSocialNetworks() {
    const control = <FormArray>this.formservice.controls['social_networks'];
    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i);
    }

    if (this.service.social_networks) {
      for (const price_extra of this.service.social_networks) {
        this.addSocialNetwork(price_extra);
      }
    }
    this.showSocialAdd = false;
  }
  saveSocial(){
    this.showSocialAdd = false;
  }
  closeSocialNetworksPop(){
    this.showSocialAdd = false;
    this.resetSocialNetworks();
  }
  goToReviews(){
    this.goToServiceReviews.emit();
  }
}
