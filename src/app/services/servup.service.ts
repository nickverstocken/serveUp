import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ServupService {

  constructor(private api: ApiService) { }

  getCities(): Observable<any>{
    return this.api.getLocal('./assets/BE_cities.json');
  }
  checkEmail(emailAdress): Observable<any>{
    return this.api.post('/checkEmail', emailAdress);
  }
  registerUser(frmData): Observable<any>{
    return this.api.post('/register', frmData);
  }
  sendRegistrationMail(data): Observable<any>{
    return this.api.post('/sendMail', data);
  }
  getCategories(): Observable<any>{
    return this.api.get('/categories');
  }
}
