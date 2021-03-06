import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { NotifierService } from '../_service/notifier.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private notifier:NotifierService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
        catchError(error => {
          if(error){
            switch (error.status) {
              case 400:
                if(error.error.errors){
                  const modalStateErrors = [];
                  for (const key in error.error.errors) {
                    if(error.error.errors[key]){
                      modalStateErrors.push(error.error.errors[key])
                    }
                  }
                  throw modalStateErrors.flat();
                }else{
                  this.notifier.error(error.status + ' ' + error.statusText)
                }
                break;
                case 401:
                  this.notifier.error(error.status + ' ' + error.statusText)
                break;
                case 404:
                  if(error.error.errorId == 404 && error.error.errorCode == "NotFound")
                      this.notifier.info(error.error.message)
                  // this.router.navigateByUrl('/not-found');
                break;
                case 500:
                  const navigationExtras: NavigationExtras={state:{error:error.error}};
                  this.router.navigateByUrl('/server-error', navigationExtras);
                break;
              default:
                this.notifier.error('something went wrong')
                console.log(error);
                break;
            }
          }
          return throwError(error)
        })
    );
  }
}
