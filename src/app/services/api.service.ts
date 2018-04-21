import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment.prod';

@Injectable()
export class ApiService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl =  environment.baseUrl + '/api/v1';
  }
  getLocal(path: string): Observable<any> {
    return this.http.get(path);
  }
  get(path: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${path}`);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.baseUrl}${path}`, body);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.baseUrl}${path}`, body);
  }

  delete(path): Observable<any> {
    return this.http.delete(`${this.baseUrl}${path}`);
  }
}
