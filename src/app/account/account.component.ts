import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ServupService} from '../services/servup.service';
import {AuthService} from '../services/auth.service';
import {User} from '../models/User';
import {EmailValidator} from '../custom-validation/email.validator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;
  disallowUpload = true;
  formuser;
  cardEdit;
  constructor(private serveUpService: ServupService, private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(result => {
      if(result.id){
        this.user = result;
        this.buildForm1();
      }
    });
  }
  buildForm1(){
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
  userPictureLoad(file) {
    this.formuser.controls.picture.setValue(file.file);
  }
  cancelEditMode(formid, model){
    this[formid].reset(this[model]);
    this.cardEdit = undefined;
  }
}
