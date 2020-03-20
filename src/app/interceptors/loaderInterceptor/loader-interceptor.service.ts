import { Injectable } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {

  constructor(
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.loadingStateChange.next(true);
    return next.handle(req).pipe(
      finalize(() => this.loaderService.loadingStateChange.next(false))
    );
  }
}
