import {Component, OnInit, OnDestroy, AfterViewInit, ViewChild} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {ServupService} from '../services/servup.service';
import {City} from '../models/City';
import {StepperComponent} from '../components/stepper/stepper.component';

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
  user: User = new User;
  stepsUser = [
    {
      'headerText': 'Persoonlijke Info',
      'icon': 'lnr lnr-user',
      'description': 'Vul het formulier in. Je kan altijd je antwoorden aanpassen in je profiel instellingen.',
      'model': 'user',
      'items': [
        {'name': 'fname', 'label': 'Voornaam', 'validation': ['required'], 'class': 'evenLength', 'type': 'text', 'maxlength': 50},
        {'name': 'name', 'label': 'Naam', 'validation': ['required'], 'class': 'evenLength', 'type': 'text', 'maxlength': 50},
        {'name': 'email', 'label': 'Email', 'validation': ['required', 'email'], 'class': '', 'type': 'text', 'maxlength': 191},
        {
          'name': 'password',
          'label': 'Wachtwoord',
          'validation': ['required', 'password'],
          'class': '',
          'type': 'password',
          'maxlength': 191
        },
        {
          'name': 'password_confirmation',
          'label': 'Bevestig wachtwoord',
          'validation': ['required', 'password_confirmation'],
          'class': '',
          'type': 'password',
          'maxlength': 191
        }
      ]
    },
    {
      'headerText': 'Optionele info',
      'icon': 'lnr lnr-thumbs-up',
      'model': 'user',
      'description': 'Vertel iets meer over jezelf en kies een profielfoto zodat je herkenbaar bent.',
      'items': [
        {'name': 'profile_picture', 'label': 'Profielfoto', 'class': 'small center', 'type': 'imageUpload'},
        {'name': 'introduction', 'label': 'Vertel iets meer over jezelf', 'class': 'large', 'type': 'textarea', 'maxlength': 300},
        {'name': 'address_name', 'label': 'Adres', 'class': 'large', 'type': 'text', 'maxlength': 191},
        {'name': 'address_number', 'label': 'Nummer', 'class': 'small', 'type': 'text', 'maxlength': 10},
        {'name': 'zip', 'label': 'Postcode', 'class': 'small', 'type': 'text', 'maxlength': 11},
        {'name': 'city', 'label': 'Stad', 'class': 'large', 'type': 'text', 'readonly': true}
      ]
    }
  ];
  stepsService = [
    {
      'headerText': 'Persoonlijke Info',
      'icon': 'lnr lnr-user',
      'description': 'Vul het formulier in. Je kan altijd je antwoorden aanpassen in je profiel instellingen.',
      'model': 'user',
      'items': [
        {'name': 'fname', 'label': 'Voornaam', 'validation': ['required'], 'class': 'evenLength', 'type': 'text', 'maxlength': 50},
        {'name': 'name', 'label': 'Naam', 'validation': ['required'], 'class': 'evenLength', 'type': 'text', 'maxlength': 50},
        {'name': 'email', 'label': 'Email', 'validation': ['required', 'email'], 'class': '', 'type': 'text', 'maxlength': 191},
        {
          'name': 'password',
          'label': 'Wachtwoord',
          'validation': ['required', 'password'],
          'class': '',
          'type': 'password',
          'maxlength': 191
        },
        {
          'name': 'password_confirmation',
          'label': 'Bevestig wachtwoord',
          'validation': ['required', 'password_confirmation'],
          'class': '',
          'type': 'password',
          'maxlength': 191
        }
      ]
    },
    {
      'headerText': 'Optionele info',
      'icon': 'lnr lnr-thumbs-up',
      'model': 'user',
      'description': 'Vertel iets meer over jezelf en kies een profielfoto zodat je herkenbaar bent.',
      'items': [
        {'name': 'profile_picture', 'label': 'Profielfoto', 'class': 'small center', 'type': 'imageUpload'},
        {'name': 'introduction', 'label': 'Vertel iets meer over jezelf', 'class': 'large', 'type': 'textarea', 'maxlength': 300},
        {'name': 'address_name', 'label': 'Adres', 'class': 'large', 'type': 'text', 'maxlength': 191},
        {'name': 'address_number', 'label': 'Nummer', 'class': 'small', 'type': 'text', 'maxlength': 10},
        {'name': 'zip', 'label': 'Postcode', 'class': 'small', 'type': 'text', 'maxlength': 11},
        {'name': 'city', 'label': 'Stad', 'class': 'large', 'type': 'text', 'readonly': true}
      ]
    },
    {
      'headerText': 'Service info',
      'icon': 'lnr lnr-store',
      'model': 'buisiness',
      'description': 'Geef wat info over je service, hoe meer info hoe beter klanten je gaan vinden. Je kan meerdere services toevoegen bij instellingen',
      'items': [
        {'name': 'logo', 'label': 'Logo', 'class': 'small center', 'type': 'imageUpload'},
        {'name': 'service_description', 'label': 'Service beschrijving', 'class': 'large', 'type': 'textarea', 'maxlength': 300},
        {'name': 'service_adress', 'label': 'Adres', 'validation': ['required'], 'class': 'large', 'type': 'text', 'maxlength': 191},
        {'name': 'service_adress_number', 'label': 'Nummer', 'validation': ['required'], 'class': 'small', 'type': 'text', 'maxlength': 10},
        {'name': 'service_zip', 'label': 'Postcode', 'validation': ['required'], 'class': 'small', 'type': 'text', 'maxlength': 11},
        {'name': 'service_city', 'label': 'Stad', 'validation': ['required'], 'class': 'large', 'type': 'text', 'readonly': true}
      ]
    },
    {
      'headerText': 'Info voor klanten',
      'icon': 'lnr lnr-users',
      'model': 'buisiness',
      'description': 'Info zodat klanten je nog beter kunnen zoeken. ',
      'items': [
        {'name': 'service_hours', 'label': 'Werkdagen', 'class': '', 'type': 'dayselector'},
        {'name': 'service_category', 'label': 'Categorie', 'class': '', 'type': 'select'},
        {
          'name': 'service_tags',
          'label': 'Welke keywoorden horen bij je service (max 10)?',
          'class': '',
          'type': 'taginput',
          'maxlength': 10
        },
        {'name': 'service_travel', 'label': 'Ga jij naar je klanten of komen zij naar u (of beide)?', 'class': '', 'type': 'travel'}
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, location: PlatformLocation, private serveUpService: ServupService) {

  }

  ngOnInit() {

    this.smallText = 'Maak een keuze';
    this.sub = this.route.queryParams
      .subscribe(params => {
        this.choice = params.as || '';
        if (this.choice === 'user') {
          this.initVariables('Registreer als klant', 2);
          return;
        }
        if (this.choice === 'service') {
          this.initVariables('Registreer als service', 4);
          return;
        } else {
          this.smallText = 'Maak een keuze';
        }
      });

  }

  initVariables(smallText, numberOfsteps) {
    this.smallText = smallText;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  @ViewChild('stepperUser') stepperUser: StepperComponent;

  register(model) {

    this.stepperUser.completed = true;
    this.stepperUser.error = false;
    console.log(model);
    const frmData = this.assignFormData(model);
    frmData.append('role', 'user');
    frmData.append('address', model.address_name + ' ' + model.address_number);
    console.log(frmData);
    this.serveUpService.registerUser(frmData).subscribe(
      res => {
        console.log(res);
        let mailData = new FormData();
        mailData.append('email', res.user.email);
        mailData.append('name', res.user.name);
        mailData.append('fname', res.user.fname);
        mailData.append('verification', res.verification);
        this.serveUpService.sendRegistrationMail(mailData).subscribe(
          mailres => {
            console.log(mailres);
          }
        )
      },
      error => {
        console.log(error);
      }
    );
  }

  registerService(model) {
    console.log(model);

  }
  assignFormData(model){
    let frmData = new FormData();
    for (let key in model) {
      frmData.append(key, model[key]);
    }
    return frmData;
  }
  ngAfterViewInit() {
  }

}
