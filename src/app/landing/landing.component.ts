import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  model: any = {};
  errors: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.auth.login(this.model)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
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
