import {Component, OnInit, AfterViewInit, ViewChild, OnChanges, ChangeDetectorRef} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ServupService} from '../services/servup.service';
import {User} from '../models/User';
import {AuthService} from '../services/auth.service';
import {ImageUploaderComponent} from '../components/image-uploader/image-uploader.component';
import {EmailValidator} from '../custom-validation/email.validator';
import {EqualValueValidator} from '../custom-validation/equal-value.validator';
import {Service} from '../models/Service';
import {Category} from '../models/Category';

declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  disallowUpload = true;
  isEditMode = false;
  editting = false;
  showMedia = false;
  user: User;
  oldUser: User;
  selectedService: Service;
  oldService: Service;
  responseError = [];
  formAc1;
  formAc2;
  formAc3;
  formAc4;
  formAc5;
  formAc6;
  formAc7;
  formAc8;
  servicePreview;
  categories: Category[];
  selectedCategory;
  maxkm = [
    {
      value: '5',
      name: '5 km'
    },
    {
      value: '10',
      name: '10 km'
    },
    {
      value: '20',
      name: '20 km'
    },
    {
      value: '30',
      name: '30 km'
    },
    {
      value: '40',
      name: '40 km'
    },
    {
      value: '50',
      name: '50 km'
    },
    {
      value: '60',
      name: '60 km'
    },
    {
      value: '70',
      name: '70 km'
    },
    {
      value: '100',
      name: '100 km'
    },
    {
      value: '200',
      name: '200 km'
    }];
  @ViewChild('userimgupload')
  private userimgupload: ImageUploaderComponent;
  @ViewChild('serviceLogoUpload')
  private serviceLogoUpload: ImageUploaderComponent;

  constructor(private serveUpService: ServupService, private authService: AuthService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      result => {
        if (result.id) {
          this.user = result;
          this.oldUser = Object.assign({}, this.user);
          this.buildFormAc1();
          this.buildFormAc2();
          if(this.user.role === 'service'){
            this.serveUpService.getCategories().subscribe(
              resultcat => {
                this.categories = resultcat.categories;
              }
            );
          }
        }
      }
    );
  }

  setService(service: Service) {
    const index = this.user.service.indexOf(service);
    this.selectedService = this.user.service[index];
    this.oldService = Object.assign({}, this.selectedService);
    if (this.serviceLogoUpload) {
      this.serviceLogoUpload.imageSrc = this.selectedService.logo;
    }
    this.buildFromAc3();
    this.buidFormAc4();
    this.buildFormAc5();
    this.buildFormAc6();
    this.buildFormAc7();
    this.buildFormAc8();

  }

  saveUser(id) {
    const frmData = this.assignFormData(this.formAc1.value);
    frmData.append('city_id', this.formAc1.controls.city.controls.id.value);
    this.serveUpService.updateUser(frmData).subscribe(
      result => {
        this.authService.setAuth(this.user);
        Object.assign(this.user, result.user);
        Object.assign(this.oldUser, result.user);
        this.rebuildForm(this.formAc1, this.user);
        this.resetEdit(id);
        this.authService.setAuth(this.user);
      },
      (error) => {
        this.handleErrors(id, error);
      }
    );
  }

  saveService(id) {
    // ['form' + id]
    const form = this['form' + id.charAt(0).toUpperCase() + id.slice(1)];
    console.log(form.value);
    let frmData = this.assignFormData(form.value);
    frmData.append('city_id', this.formAc4.controls.city.controls.id.value);
    if (id === 'ac5' || id === 'ac7' || id === 'ac8') {
      frmData = form.value;
    }

    this.serveUpService.updateService(this.selectedService.id, frmData).subscribe(
      result => {
        Object.assign(this.selectedService, result.service);
        Object.assign(this.oldService, result.service);
        this.rebuildForm(this.formAc3, this.selectedService);
        this.resetEdit(id);
      }
    );
  }

  rebuildForm(form, model) {
    form.reset(model);
  }

  buildFormAc1() {
    this.formAc1 = this.fb.group({
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

  buildFormAc2() {
    this.formAc2 = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  buildFromAc3() {
    this.formAc3 = this.fb.group({
      name: [this.selectedService.name, Validators.required],
      description: [this.selectedService.description],
      logo: [this.selectedService.logo]
    });
  }

  buidFormAc4() {
    this.formAc4 = this.fb.group({
      address: [this.selectedService.address, Validators.required],
      city: this.fb.group({
        id: [this.selectedService.city.id, Validators.required],
        name: [this.selectedService.city.name, Validators.required],
        zip: [this.selectedService.city.zip, [Validators.required, Validators.minLength(4)]]
      }),
      tel: [this.selectedService.tel],
      experience: [this.selectedService.experience],
      website: [this.selectedService.website]
    });
  }

  buildFormAc5() {
    this.formAc5 = this.fb.group({
      business_hours: [this.selectedService.business_hours]
    });
  }

  buildFormAc6() {
    this.formAc6 = this.fb.group({
      max_km: [this.selectedService.max_km]
    });

  }

  buildFormAc7() {
    this.formAc7 = this.fb.group({
      price_extras: this.fb.array([])
    });
    if (this.selectedService.price_extras) {
      for (let price_extra of this.selectedService.price_extras) {
        this.addPriceExtra(price_extra);
      }
    }

  }
  buildFormAc8() {
    this.formAc8 = this.fb.group({
      category_id: [this.selectedService.category_id],
      tags: [this.selectedService.tags]
    });

  }

  addPriceExtra(value = null) {
    if (!value) {
      value = {name: '', price: ''};
    }
    const control = <FormArray>this.formAc7.controls['price_extras'];
    const addrCtrl = this.initPriceExtra(value);
    control.push(addrCtrl);
  }

  initPriceExtra(value) {
    return this.fb.group({
      name: [value.name, Validators.required],
      price: [value.price, Validators.required]
    });
  }

  removePriceExtra(index) {
    const control = <FormArray>this.formAc7.controls['price_extras'];
    control.removeAt(index);
  }

  changePassword(id) {
    const frmData = this.assignFormData(this.formAc2.value);
    this.serveUpService.changePass(frmData).subscribe(
      result => {
        if (result.success) {
          this.formAc2.reset();
          this.resetEdit(id);
        }
      },
      (error) => {
        this.handleErrors(id, error);
        console.log(this.responseError[id]);
      }
    );
  }

  handleErrors(id, error) {
    this.responseError[id] = '';
    for (let key in error.error.error) {
      this.responseError[id] += error.error.error[key] + '<br>';
    }
  }

  assignFormData(model) {
    const frmData = new FormData();
    for (const key of Object.keys(model)) {
      frmData.append(key, model[key]);
    }
    return frmData;
  }

  toggleAccOpened(id) {
    if (!this.editting) {
      if ($('.acBody').is(':visible')) {
        $('.acBody').slideUp(250, 'swing');
        //   $('.profileEdit').scrollTop(0);
      }
      if ($('#' + id).is(':hidden')) {
        $('#' + id).slideDown(250, 'swing');
      }
    } else {
      this.responseError[id] = 'Wijzig of annuleer eerst je wijzigingen a.u.b.' + '<br>';
    }

  }

  editMode(id) {
    this.editting = true;
    $('.saveError').remove();
    if (id === 'ac6') {
      this.isEditMode = true;
    }
    if (id === 'ac1') {
      this.disallowUpload = false;
    }
    if (id === 'ac3') {
      this.disallowUpload = false;
    }
    $('#' + id + ' .edit').hide();
    $('#' + id + ' .editting').show();
    $('#' + id + ' .editable').removeClass('disabled');
    $('#' + id + ' .editable').attr('readonly', false);
  }

  cancelEditMode(id) {
    switch (id) {
      case 'ac1': {
        this.userimgupload.loaded = false;
        this.userimgupload.imageSrc = this.oldUser.picture;
        this.user.picture = this.oldUser.picture;
        Object.assign(this.user, this.oldUser);
        this.rebuildForm(this.formAc1, this.user);
        break;
      }
      case 'ac2': {
        //statements;
        this.formAc2.reset();
        break;
      }
      case 'ac3': {
        this.serviceLogoUpload.loaded = false;
        this.serviceLogoUpload.imageSrc = this.oldService.logo;
        this.selectedService.logo = this.oldService.logo;
        Object.assign(this.selectedService, this.oldService);
        this.rebuildForm(this.formAc3, this.selectedService);
        break;
      }
      case 'ac4': {
        Object.assign(this.selectedService, this.oldService);
        this.rebuildForm(this.formAc4, this.selectedService);
        //statements;
        break;
      }
      case 'ac5': {
        Object.assign(this.selectedService, this.oldService);
        console.log(this.selectedService.business_hours);
        this.formAc5.controls.business_hours.setValue(this.selectedService.business_hours);
        this.rebuildForm(this.formAc5, this.selectedService);
        //statements;
        break;
      }
      case 'ac6': {
        Object.assign(this.selectedService, this.oldService);
        this.rebuildForm(this.formAc6, this.selectedService);
        break;
      }
      case 'ac7': {
        Object.assign(this.selectedService, this.oldService);
        this.buildFormAc7();
        break;
      }
      case 'ac8': {
        this.selectedService.category_id = this.oldService.category_id;
        this.buildFormAc8();
      //  Object.assign(this.selectedService, this.oldService);
        //statements;
        break;
      }
      default: {
        //statements;
        break;
      }
    }
    this.resetEdit(id);

  }

  resetEdit(id) {
    this.disallowUpload = true;
    this.editting = false;
    this.isEditMode = false;
    this.responseError[id] = '';
    $('#' + id + ' .edit').show();
    $('#' + id + ' .editting').hide();
    $('#' + id + ' .editable').addClass('disabled');
    $('#' + id + ' .editable').attr('readonly', true);
  }

  selectedRadiusChange(radius) {
    this.formAc6.controls['max_km'].setValue(radius[1]);
  }

  userPictureLoad(file) {
    this.formAc1.controls.picture.setValue(file.file);
  }

  serviceLogoUploaded(file) {
    this.formAc3.controls.logo.setValue(file.file);
  }

  changeBusinessHours(selectedDays) {
    this.formAc5.controls.business_hours.setValue(selectedDays);
  }

  changeCategory_id(event){

    this.selectedService.category_id = event[1];
     this.formAc8.controls.category_id.setValue(event[1]);
  }

  addTagsToService(tag){
    this.formAc8.controls.tags.setValue(this.selectedService.tags);
  }
  removeTagsFromService(tag){
    this.serveUpService.removeTag(this.selectedService.id, tag).subscribe(
      result => {
        if(result.success){
          //console.log(this.selectedService.tags);
          this.selectedService.tags = this.selectedService.tags.filter(t => t.name !== tag);
          this.formAc8.controls.tags.setValue(this.selectedService.tags);
        }
      }
    );

  }

  closeMediaPop() {
    this.showMedia = false;
  }
}
