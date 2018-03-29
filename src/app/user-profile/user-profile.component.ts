import { Component, OnInit, AfterViewInit, ViewChild,  OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {MapAreaComponent} from '../components/map-area/map-area.component';
import {ServupService} from '../services/servup.service';
import {User} from '../models/User';
import {AuthService} from '../services/auth.service';
import {ImageUploaderComponent} from '../components/image-uploader/image-uploader.component';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnChanges {
  currentId = 0;
  mapIsLoaded = false;
  disallowUpload = true;
  isEditMode = false;
  editting = false;
  user: User;
  oldUser: User;
  formAc1;
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
      value: '50',
      name: '50 km'
    },
    {
      value: '100',
      name: '100 km'
    },
    {
      value: '200',
      name: '200 km'
    }];
  @ViewChild('map')
  private mapcomp: MapAreaComponent;
  @ViewChild('userimgupload')
  private userimgupload: ImageUploaderComponent;
  constructor(private serveUpService: ServupService, private authService: AuthService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.serveUpService.getCurrentUser().subscribe(
      result => {
        this.user = result.user;
       this.oldUser =  Object.assign({}, this.user);
        this.formAc1 = this.fb.group({
          fname: [this.user.fname, Validators.required],
          name: [this.user.name, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]],
          picture: [this.user.picture],
          address: [this.user.address, Validators.required],
          zip: [this.user.zip, Validators.required],
          city: [this.user.city, Validators.required],
          introduction: [this.user.introduction]
        });
      }
    );
  }
  ngOnChanges() {
    this.rebuildForm(this.formAc1);
  }
  rebuildForm(form) {
    console.log(this.user);
    form.reset(/*{
      fname: this.user.fname,
      name: this.user.name,
      email: this.user.email,
      picture: this.user.picture,
      address: this.user.address,
      zip: this.user.city.zip,
      city: this.user.city.name,
      introduction: this.user.introduction
    }*/ this.user);
  }
  saveUser(){
    console.log(this.formAc1.value);
  }
  toggleAccOpened(id){
    if(!this.editting){
      if($('.acBody').is(':visible')){
        $('.acBody').slideUp(250, 'swing');
      }
      if($('#' + id).is(':hidden')){
        $('#' + id).slideDown(250, 'swing');
      }
      if(id === 'ac6' && this.mapIsLoaded){
        this.mapcomp.map.resize();
      }
    }else{
      alert('Wijzig of annuleer eerst je wijzigingen a.u.b.');
    }

  }
  editMode(id){
    this.editting = true;
    $('.saveError').remove();
    if(id === 'ac6'){
      this.isEditMode = true;
    }
    if(id === 'ac1'){
      this.disallowUpload = false;
    }
    $('#' + id + ' .edit').hide();
    $('#' + id + ' .editting').show();
    $('#' + id + ' .editable').removeClass('disabled');
    $('#' + id + ' .editable').attr('readonly', false);
  }
  cancelEditMode(id){
    switch(id) {
      case 'ac1': {
        this.disallowUpload = true;
        this.userimgupload.loaded = false;
        this.userimgupload.imageSrc = this.user.picture;
        this.user.picture = this.oldUser.picture;
        this.rebuildForm(this.formAc1);
        this.resetEdit(id);
        break;
      }
      case 'ac2': {
        //statements;
        break;
      }
      case 'ac3': {
        //statements;
        break;
      }
      case 'ac4': {
        //statements;
        break;
      }
      case 'ac5': {
        //statements;
        break;
      }
      case 'ac6': {
        this.isEditMode = false;
        break;
      }
      case 'ac7': {
        //statements;
        break;
      }
      case 'ac8': {
        //statements;
        break;
      }
      default: {
        //statements;
        break;
      }
    }

  }
  resetEdit(id){
    this.editting = false;
    $('#' + id + ' .edit').show();
    $('#' + id + ' .editting').hide();
    $('#' + id + ' .editable').addClass('disabled');
    $('#' + id + ' .editable').attr('readonly', false);
    Object.assign(this.user, this.oldUser);
  }
  selectedRadiusChange(radius){
    this.mapcomp.changeBounds(radius[1]);
  }
  userPictureLoad(file){
    this.user.picture = file.file;
    this.rebuildForm(this.formAc1);
  }
  mapLoaded(loaded){
    if(loaded){
      this.mapIsLoaded = true;
      this.mapcomp.map.resize();
    }
  }

}
