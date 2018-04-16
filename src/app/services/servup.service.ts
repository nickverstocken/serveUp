import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Service} from '../models/Service';
@Injectable()
export class ServupService {
  private selectedServiceSubject = new BehaviorSubject<any>(-1);
  public selectedService = this.selectedServiceSubject.asObservable().distinctUntilChanged();
  constructor(private api: ApiService) { }

  setSelectedService(serviceId) {
    localStorage.setItem('selectedService', serviceId);
    this.selectedServiceSubject.next(serviceId);
  }
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
  getCurrentUser(): Observable<any>{
    return this.api.get('/login/user?include=city,service.faq');
  }
  updateUser(user): Observable<any>{
    return this.api.post('/user/update', user);
  }
  changePass(form): Observable<any>{
    return this.api.post('/user/changepassword', form);
  }
  updateService(id, form): Observable<any>{
    return this.api.post(`/service/update/${id}`,form);
  }
  removeTag(serviceId, tagId): Observable<any>{
    return this.api.delete(`/service/${serviceId}/tag/${tagId}`);
  }
  searchCategories(searchTerm): Observable<any>{
    return this.api.get(`/subcategories?search=${searchTerm}`);
  }
  getSubCategory(id): Observable<any>{
    return this.api.get(`/subcategory/${id}`);
  }
  getServicesNearbyCount(subcatId, cityName): Observable<any>{
    return this.api.get(`/service/${subcatId}/nearby/${cityName}/count`);
  }
  saveRequest(form): Observable<any>{
    return this.api.post(`/request/save`, form);
  }
  getAllRequests(): Observable<any>{
    return this.api.get(`/request/all`);
  }
}
