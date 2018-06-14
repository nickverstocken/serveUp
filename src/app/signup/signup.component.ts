import {Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {ServupService} from '../services/servup.service';
import {City} from '../models/City';
import {StepperComponent} from '../components/stepper/stepper.component';
import {FormBuilder, Validators} from '@angular/forms';
import {EmailValidator} from '../custom-validation/email.validator';
import {AuthService} from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  smallText = 'Maak een keuze';
  choice;
  sub;
  user = new User();
  formuser;
  page = 1;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private serveUpService: ServupService, private authService: AuthService) {

  }

  ngOnInit() {
    if(this.authService.tokenExpiration()){
      this.router.navigate(['/'])
    }
    this.smallText = 'Maak een keuze';
    this.buildFormUser();
    this.sub = this.route.queryParams
      .subscribe(params => {
        this.choice = params.as || '';
        if (this.choice === 'user') {
          this.initVariables('Registreer als klant');
          return;
        }
        if (this.choice === 'service') {
          this.initVariables('Registreer als service');
          return;
        } else {
          this.smallText = 'Maak een keuze';
        }
      });
  }

  buildFormUser(){
    this.formuser = this.fb.group({
      fname: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email], EmailValidator.createValidator(this.serveUpService)],
      picture: [null],
      address: [null, Validators.required],
      city: this.fb.group({
        id: [null, Validators.required],
        name: [null, [Validators.required], ],
        zip: [null, [Validators.required, Validators.minLength(4)]],
        lat: [null],
        lng: [null]
      }),
      introduction: [null],
      password: [null,  [Validators.required, Validators.minLength(6)]],
      password_confirmation: [null,  [Validators.required, Validators.minLength(6)]],
      role: [this.choice, [Validators.required]]
    });
  }
  initVariables(smallText) {
    this.smallText = smallText;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  @ViewChild('stepperUser') stepperUser: StepperComponent;

  register() {
    console.log(this.choice);
    const frmData = this.assignFormData(this.formuser.value);
    frmData.append('role', this.choice);
    frmData.append('city_id', this.formuser.controls.city.controls.id.value);
    this.serveUpService.registerUser(frmData).subscribe(
      res => {
        let mailData = new FormData();
        mailData.append('email', res.user.email);
        mailData.append('name', res.user.name);
        mailData.append('fname', res.user.fname);
        mailData.append('verification', res.verification);
        this.serveUpService.sendRegistrationMail(mailData).subscribe(
          mailres => {
            this.page = 4;
          }
        )
      },
      error => {
        this.page = -1;
      }
    );
  }
  assignFormData(model){
    const frmData = new FormData();
    for(const key in model) {
      frmData.append(key, model[key]);
    }
    return frmData;
  }
  setpage(nr){
    this.page = nr;
  }
  userPictureLoad(file){
    this.formuser.controls.picture.setValue(file.file);
  }
}
