import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/distinctUntilChanged';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/User';
import {ApiService} from './api.service';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  public currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private router: Router) {
  }

  populate() {

    this.isAuthenticated.subscribe(
      result => {
        if(!result){
          if(localStorage.getItem('token')){
            this.apiService.get('/login/user?include=city,service')
              .subscribe(data => {
                this.setAuth(data.user);
              });
          }else{
            this.router.navigate(['home']);
          }
      }
    });
  }

  login(fields) {
    return this.apiService.post('/login?include=city,service.faq', fields);
  }

  setAuth(user: User) {
    console.log(user);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('selectedService');
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }

  tokenExpiration() {
    return tokenNotExpired();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  refreshToken(): Observable<any> {
    return this.apiService.get('/login/refresh');
  }
}
