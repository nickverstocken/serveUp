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
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private router: Router) {
  }

  populate() {

    if(this.getToken()){
      this.apiService.get('/login/user')
        .subscribe(data => {
          this.setAuth(data.user);
        });
    }else{
      console.log('populate');
      this.router.navigate(['/home']);
    }
  }

  login(fields) {
    return this.apiService.post('/login', fields);
  }

  setAuth(user: User) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
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
