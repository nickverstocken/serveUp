import { Component, OnInit, HostListener } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../models/User';
import {environment} from '../../environments/environment.prod';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  authenticated;
  showSubnav = 'hideSubnav';
  innerWidth;
  mobile = false;
  mobileMenu = '';
  constructor(private router: Router, private auth: AuthService) {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    }
    this.auth.currentUser.subscribe(
      (userData) => {
        this.user = userData;
        this.authenticated = true;
      }
    );
    this.auth.isAuthenticated.subscribe(
      data => {
        this.authenticated = data;
      });

  }
  logout(){
    this.auth.logout();
    this.showSubnav = 'hideSubnav';
    this.mobileMenu = '';
    this.router.navigate(['/home']);
  }
  srollToTop(){
    $('html,body').animate({ scrollTop: 0 }, 'fast');
    $('#email').focus();
  }
  openMobileMenu(){
    if(this.mobileMenu === 'opened'){
      this.mobileMenu = '';
    }else{
      this.mobileMenu = 'opened';
    }

  }
}
