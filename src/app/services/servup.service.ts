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
  public serviceDeletedSubj = new BehaviorSubject<any>(null);
  public deletedService = this.serviceDeletedSubj.asObservable().distinctUntilChanged();
  constructor(private api: ApiService) {
  }

  setSelectedService(serviceId) {
    localStorage.setItem('selectedService', serviceId);
    this.selectedServiceSubject.next(serviceId);
  }
  serviceAdded(service){
    this.serviceAddedSubj.next(service);
  }
  serviceDeleted(service){
    this.serviceDeletedSubj.next(service);
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

  getCategory(id): Observable<any> {
    return this.api.get(`/categories/${id}`);
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
  getUser(id): Observable<any> {
    return this.api.get(`/user/${id}`);
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
  getService(id): Observable<any> {
    return this.api.get(`/service/${id}`);
  }
  deleteService(id): Observable<any> {
    return this.api.delete(`/service/${id}`);
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
  getServiceRequestList(serviceid, filter?): Observable<any> {
    return this.api.get(`/service/${serviceid}/requests?filter=${filter}`);
  }

  updateServiceRequest(serviceid, offerid, action): Observable<any> {
    return this.api.put(`/service/${serviceid}/offer/${offerid}/update`, action);
  }

  //offer
  getOffer(reqid, id): Observable<any> {
    return this.api.get(`/request/${reqid}/offer/${id}`);
  }
  getAllOffers(): Observable<any> {
    return this.api.get(`/offers`);
  }
  sendPriceOffer(id, offer): Observable<any> {
    return this.api.post(`/offer/${id}/priceoffer`, offer);
  }
  actionPriceOffer(id, fields): Observable<any> {
    return this.api.put(`/offer/${id}/actionpriceoffer`, fields);
  }
  saveAttachements(id, files): Observable<any> {
    return this.api.post(`/offer/${id}/attachements`, files);
  }
  hireOfferService(id): Observable<any> {
    return this.api.put(`/offer/${id}/hireservice`);
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
  markMessagesAsRead(offerid): Observable<any> {
    return this.api.get(`/offer/${offerid}/messages/markasread`);
  }
  getAllMessages(): Observable<any> {
    return this.api.get(`/messages`);
  }
  markMessagesAllAsRead(): Observable<any> {
    return this.api.get(`/offer/messages/markallasread`);
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
  getAppointment(id){
    return this.api.get(`/appointment/${id}`);
  }

  //reviews
  saveReview(offerid, fields){
    return this.api.post(`/offer/${offerid}/review`, fields);
  }
  getUserReviews(userId, page?){
    let pageurl = '';
    if(page){
      pageurl = `?page=${page}`;
    }
    return this.api.get(`/user/${userId}/reviews${pageurl}`);
  }
  getServiceReviews(serviceId, page?){
    let pageurl = '';
    if(page){
      pageurl = `?page=${page}`;
    }
    return this.api.get(`/service/${serviceId}/reviews${pageurl}`);
  }

}
