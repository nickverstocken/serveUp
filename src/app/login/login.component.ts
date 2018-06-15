import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ServupService} from '../services/servup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin;
  errors;
  constructor(private authService: AuthService, private serveUpService: ServupService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(result => {
      if(result){
        this.router.navigate(['/']);
      }
    });
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null,  [Validators.required]]
    });
  }
  login() {
    this.authService.login(this.assignFormData(this.formLogin.value))
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('selectedService', data.user.service.length > 0 ? data.user.service[0] : -1);
          this.serveUpService.setSelectedService(data.user.service.length > 0 ? data.user.service[0].id : -1);
          this.authService.setAuth(data.user);
          this.formLogin.reset();
          this.router.navigate(['/']);
        },
        error => {
          this.errors = 'Combinatie email/wachtwoord fout...';
        });
  }
  assignFormData(model){
    const frmData = new FormData();
    for(const key in model) {
      frmData.append(key, model[key]);
    }
    return frmData;
  }
}
