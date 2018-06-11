import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ServupService} from '../services/servup.service';
declare var $: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  model: any = {};
  errors: string;
  constructor(private auth: AuthService, private serveUpService: ServupService,  private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.auth.login(this.model)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('selectedService', data.user.service.length > 0 ? data.user.service[0] : -1);
          this.serveUpService.setSelectedService(data.user.service.length > 0 ? data.user.service[0].id : -1);
          this.auth.setAuth(data.user);
          $('#email').val('');
          $('#password').val('');
          this.router.navigate(['/']);
        },
        error => {
          this.errors = 'Combinatie email/wachtwoord fout...';
        });
  }
}
