import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Service} from '../models/Service';

@Injectable()
export class ServupService {
  private selectedServiceSubject = new BehaviorSubject<any>(-1);
  public selectedService = this.selectedServiceSubject.asObservable().distinctUntilChanged();
  public serviceAddedSubj = new BehaviorSubject<any>(null);
  public addedService = this.serviceAddedSubj.asObservable().distinctUntilChanged();

  constructor(private api: ApiService) {
  }

  setSelectedService(serviceId) {
    localStorage.setItem('selectedService', serviceId);
    this.selectedServiceSubject.next(serviceId);
  }
  serviceAdded(service){
    this.serviceAddedSubj.next(service);
  }
  //misc
  getCities(): Observable<any> {
    return this.api.getLocal('./assets/BE_cities.json');
  }
  checkEmail(emailAdress): Observable<any> {
    return this.api.post('/checkEmail', emailAdress);
  }

  getCategories(includes?: String): Observable<any> {
    return this.api.get(`/categories?include=${includes}`);
  }

  searchCategories(searchTerm): Observable<any> {
    return this.api.get(`/subcategories?search=${searchTerm}`);
  }

  removeTag(serviceId, tagId): Observable<any> {
    return this.api.delete(`/service/${serviceId}/tag/${tagId}`);
  }

  getSubCategory(id): Observable<any> {
    return this.api.get(`/subcategory/${id}`);
  }

  //auth
  registerUser(frmData): Observable<any> {
    return this.api.post('/register', frmData);
  }
  sendRegistrationMail(data): Observable<any> {
    return this.api.post('/sendMail', data);
  }
  getCurrentUser(): Observable<any> {
    return this.api.get('/login/user?include=city,service');
  }

  //user
  updateUser(user): Observable<any> {
    return this.api.post('/user/update', user);
  }
  changePass(form): Observable<any> {
    return this.api.post('/user/changepassword', form);
  }

  //service
  updateService(id, form): Observable<any> {
    return this.api.post(`/service/update/${id}`, form);
  }

  getServicesNearbyCount(subcatId, cityName): Observable<any> {
    return this.api.get(`/service/${subcatId}/nearby/${cityName}/count`);
  }
  addService(form): Observable<any> {
    return this.api.post(`/service/save`, form);
  }
  //request
  saveRequest(form): Observable<any> {
    return this.api.post(`/request/save`, form);
  }

  getAllRequests(): Observable<any> {
    return this.api.get(`/request/all`);
  }

  getRequest(id): Observable<any> {
    return this.api.get(`/request/${id}`);
  }

  updateRequest(request): Observable<any> {
    return this.api.put(`/request/${request.id}/update`, request);
  }

  deleteRequest(id): Observable<any> {
    return this.api.delete(`/request/${id}/delete`);
  }
  getServiceRequestList(serviceid, filter): Observable<any> {
    return this.api.get(`/service/${serviceid}/requests?filter=${filter}`);
  }

  updateServiceRequest(serviceid, offerid, action): Observable<any> {
    return this.api.put(`/service/${serviceid}/offer/${offerid}/update`, action);
  }

  //offer
  getOffer(reqid, id): Observable<any> {
    return this.api.get(`/request/${reqid}/offer/${id}`);
  }

  //notification
  getNotifications(): Observable<any> {
    return this.api.get(`/notifications`).retry(1);
  }
  markAsRead(id): Observable<any> {
    return this.api.get(`/notifications?read=${id}`);
  }

  //message
  sendMessage(offerid, message): Observable<any> {
    return this.api.post(`/offer/${offerid}/message`, message);
  }
  getMessages(id): Observable<any> {
    return this.api.get(`/offer/${id}/messages`);
  }

  //appointment
  saveAppointMent(appointment): Observable<any> {
    return this.api.post('/appointment/save', appointment);
  }
  deleteAppointment(id, messageInfo): Observable<any> {
    return this.api.put(`/appointment/${id}/delete`, messageInfo);
  }
  acceptAppointment(id, messageInfo): Observable<any> {
    return this.api.put(`/appointment/${id}/accept`, messageInfo);
  }
  getAppointments(start, end){
    return this.api.get(`/appointments?start=${start}&end=${end}`);
  }
}
