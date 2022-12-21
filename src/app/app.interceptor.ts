import {Inject, Injectable, Provider} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders
} from '@angular/common/http';
import {BehaviorSubject, catchError, EMPTY, Observable, tap} from 'rxjs';

import {InjectionToken} from "@angular/core";
import {UserService} from "./services/fetch/user.service";
import {Router} from "@angular/router";
import {LocalService} from "./services/storage/local-storage.service";
import {LoaderService} from "./shared/loader.service";


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private userService: UserService,
              private router: Router,
              private localService: LocalService,
              private loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = this.localService.getData('auth')
    const sauth = this.localService.getSessionData('auth')
    if (req.withCredentials) {
      if (!auth) {
        if (!sauth) {
          this.loaderService.hideLoader()
          this.router.navigate(['auth/login'])
          return EMPTY
        }
      }
      const token = (auth) ? auth['token'] : sauth['token']
      const headers = new HttpHeaders({'Authorization': `Token ${token}`});
      req = req.clone({url: req.url, headers: headers, withCredentials: false})
      return next.handle(req).pipe(
        catchError((err, cauth) => {
            this.loaderService.hideLoader()
            throw err
          }
        )
      )
    }


    req.clone({url: req.url})
    return next.handle(req);
  }
}


export const
  appInterceptorPrivider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true,
  }
