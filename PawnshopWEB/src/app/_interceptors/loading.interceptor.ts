import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerloadingService } from '../_service/spinnerloading.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerLoader: SpinnerloadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerLoader.busy();
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        console.log(this.spinnerLoader.busyRequestCount);
        this.spinnerLoader.idle();
      })
    );
  }
}
