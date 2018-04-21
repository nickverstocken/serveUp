import {Component, OnInit, Input, AfterViewInit, OnDestroy, Output, EventEmitter, HostListener} from '@angular/core';
import {trigger, transition, style, animate, state} from '@angular/animations';
import {ServupService} from '../../services/servup.service';
import {City} from '../../models/City';

declare var $: any;

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
          ':enter', [
            style({'position': 'absolute', opacity: 0}),
            animate('200ms', style({'position': 'relative', 'opacity': 1}))
          ]
        ),
        transition(
          ':leave', [
            style({ 'position': 'relative', 'opacity': 1}),
            animate('200ms', style({'position': 'absolute', 'opacity': 0}))
          ]
        )]
    )
  ]
})
export class StepperComponent implements OnInit {
  @Input() steps;
  @Input() lastSteptext = 'Bevestig';
  @Input() completedText;
  @Input() errorText;
  @Input() completedButtonText;
  @Input() completedButtonErrorText;
  @Input() completedHeaderText;
  @Input() completedHeaderErrorText;
  @Output() lastStepCallBack: EventEmitter<any> = new EventEmitter<any>();
  emailError;
  cities;
  pageErrors;
  model: any = {};
  currentStep = 1;
  showRegisterButton = false;
  completed = false;
  error = false;
  showMaxKm = false;
  maxKms = [
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
    }
    ]
  constructor(private serveUpService: ServupService) {
  }

  ngOnInit() {
    this.getCities();
  }
  tryAgain(){
    this.completed = false;
    this.error = false;
    this.slideBackward(1);
    this.currentStep = 1;
  }
  ngAfterViewInit() {
    $('#password').on('keyup', (event) => {
      this.checkValidation(event, ['required', 'password']);
    });
    $('#password_confirmation').on('keyup', (event) => {
      this.checkValidation(event, ['required', 'password_confirmation']);
    });
    $('#service_city').on('change', (event) => {
      this.checkValidation(event, ['required']);
    });
  }
  ngOnDestroy(){
    $('.error').addClass('hide');
    $('.success').addClass('hide');
  }
  checkCheckBox(event, id){
    if($('#' + id).prop('checked')){
      if(id === 'travel'){
        this.showMaxKm = false;
      }
      $('#' + id).prop('checked', false);
    }else{
      if(id === 'travel'){
        this.showMaxKm = true;
      }
      $('#' + id).prop('checked', true);
    }
  }
  checkAllValidation() {
    let itemsToValidate = this.steps[this.currentStep - 1].items.filter(item => item.validation);
    let itemsValidated = this.steps[this.currentStep - 1].items.filter(item => item.validated);
    let itemsError = this.steps[this.currentStep - 1].items.filter(item => !item.validated && item.validation);
    for(let error of itemsError){
      if($(`#${error.name}Error`).hasClass('hide')){
        $(`#${error.name}Error`).removeClass('hide');
        $(`#${error.name}Success`).addClass('hide');
      }
    }
    //return true;
    return itemsToValidate.length === itemsValidated.length;
  }

  getCities() {
    this.serveUpService.getCities().subscribe(
      res => {
        this.cities = res.city.data;
        this.cities.sort();
      });
  }
  confirmLastPage(){
    this.lastStepCallBack.emit(this.model);
  }
  checkDisableButtons() {
    if (this.currentStep <= 1) {
      $('.prev').addClass('disabled');
    } else {
      $('.prev').removeClass('disabled');
    }
    if (this.currentStep === this.steps.length) {
     this.showRegisterButton = true;
    } else {
      this.showRegisterButton = false;
      $('.next').removeClass('disabled');
    }
  }

  slideForward(page: number) {
    this.checkAllValidation();
    this.currentStep = page;
  }

  slideBackward(page: number) {
    this.pageErrors = '';
    this.checkAllValidation();
    $('.next').text('Volgende stap');
    $('.next').removeClass('confirm');
    this.currentStep = page;
  }

  moveTopage(page: number) {
    if (page !== this.currentStep) {
      $('.stepperPagination li').removeClass('current');
      if (page >= this.currentStep) {
        if (this.currentStep < this.steps.length) {
          if(this.checkAllValidation()){
            this.slideForward(page);
          }else{
            this.pageErrors = 'Niet alle velden zijn correct ingevuld';
          }
        }
      } else {
        if (this.currentStep-1 > 0) {
          this.slideBackward(page);
        }
      }
      this.checkDisableButtons();
      $('.stepperPagination #pagination' + this.currentStep).addClass('current');
    }
  }
  checkValidation(event, rules) {
    const element = event.target;
    const value = $(element).val();
    if (rules.includes('required')) {
      this.hideOrShowError(value, element);
    }
    if (rules.includes('email')) {
      let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (this.hideOrShowError(re.test(value.toLowerCase()), element)) {
        this.serveUpService.checkEmail(this.model).subscribe(
          res => {
            this.hideOrShowError(res.success, element);
            this.emailError = '';
          },
          (error) => {
            this.hideOrShowError(error.error.success, element);
            this.emailError = 'Email is al in gebruik.';
          }
        );
      }
    }
    if (rules.includes('password')) {
      if (this.hideOrShowError(value.length >= 6, element)) {
        if (value === $('#password_confirm').val()) {
          $(`#password_confirmationError`).addClass('hide');
          $(`#password_confirmationSuccess`).removeClass('hide');
        } else {
          $(`#password_confirmationError`).removeClass('hide');
          $(`#password_confirmationSuccessSuccess`).addClass('hide');
        }
      } else {
        $(`#password_confirmError`).removeClass('hide');
        $(`#password_confirmSuccess`).addClass('hide');
      }
    }
    if (rules.includes('password_confirmation')) {
      this.hideOrShowError(value.length >= 6 && value === $('#password').val(), element);
    }
  }
  handleFileUpload(event){
    console.log(event.control_id);
    if(event.control_id === 'profile_picture'){
      this.model.picture = event.file;
    }
    if(event.control_id === 'logo'){
      this.model.logo = event.file;
    }
  }
  hideOrShowError(condition, element) {
    let itemToValidate = this.steps[this.currentStep -1].items.filter(item => item.name === element.id);
    if (!condition) {
      $(`#${element.id}Error`).removeClass('hide');
      $(`#${element.id}Success`).addClass('hide');
      this.steps[this.currentStep -1].items[this.steps[this.currentStep -1].items.indexOf(itemToValidate[0])].validated = false;
      return false;
    } else {
      $(`#${element.id}Error`).addClass('hide');
      $(`#${element.id}Success`).removeClass('hide');
      this.steps[this.currentStep -1].items[this.steps[this.currentStep -1].items.indexOf(itemToValidate[0])].validated = true;
      return true;
    }
  }

  showAutofill(event, name) {
    if(name === 'zip'){
      this.model.city = '';
      this.model.city_id = 0;
      this.model.province = '';
      if (this.model.zip) {
        $('#autoFillcity').removeClass('hide');
      } else {
        $('#autoFillcity').addClass('hide');
      }
    }
    if(name === 'service_zip'){
      this.model.service_city = '';
      this.model.service_city_id = 0;
      this.model.service_province = '';
      if (this.model.service_zip) {
        $('#autoFillservice_city').removeClass('hide');
      } else {
        $('#autoFillservice_city').addClass('hide');
      }
    }
  }

  fillInCity(city: City) {
    this.model.city_id = city.id;
    this.model.city = city.name;
    this.model.zip = city.zip.toString();
    this.model.province = city.province;
    $('#autoFillcity').addClass('hide');
  }
  fillInServiceCity(city:City) {
    this.model.service_city_id = city.id;
    this.model.service_city = city.name;
    $('#service_city').val(city.name);
    $('#service_city').trigger('change');
    this.model.service_zip = city.zip.toString();
    this.model.service_province = city.province;
    $('#autoFillservice_city').addClass('hide');
  }
}
