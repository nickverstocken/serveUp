import {Injectable, Injector} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isrefreshing = false;
  authService: AuthService;
  constructor(private inj: Injector, private router: Router) {
    this.authService = this.inj.get(AuthService);
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({setHeaders: {Authorization: 'Bearer ' + token}});
  }

  getRefreshToken(next, req) {


    return this.authService.refreshToken().first().switchMap(
      response => {
        localStorage.setItem('token', response.token);
        this.isrefreshing = false;
        return next.handle(this.addToken(req, response.token));
      }
    );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const auth = this.inj.get(AuthService);
    return next.handle(this.addToken(req, auth.getToken()))
      .catch((error) => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 401: {
              if (!this.isrefreshing) {
                if (auth.getToken()) {
                  if (!auth.tokenExpiration()) {
                    this.isrefreshing = true;
                    return this.getRefreshToken(next, req);
                  }
                  return next.handle(this.addToken(req, auth.getToken()));
                } else {
                  window.location.href = '/home';

                  return Observable.throw(error);
                }
              }
              break;
            }
            case 400: {
              return Observable.throw(error);
            }
            case 422: {
              return Observable.throw(error);
            }

            default: {
              return Observable.throw(error);
            }
          }
        } else {
          this.authService.logout();
          return Observable.throw(error);
        }
      });
  }
}
