import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppMaterialModule } from './app-material.module';
import { PwaModule } from './pwa/pwa.module';
import { PwaService } from './services/pwa/pwa.service';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { SwModule } from './modules/serviceWorker/sw.module';
import { UpdatesService } from './services/pwa/sw/updates/updates.service';
import { LoaderInterceptorService } from './interceptors/loader/loader-interceptor.service';
import { ProgressBarComponent } from './loaders/progress-bar/progress-bar.component';
import { NoCacheInterceptorService } from './interceptors/noCache/no-cache-interceptor.service';
import { UrlSerializer } from '@angular/router';
import { UrlSensitiveService } from './services/urlSensitive/url-sensitive.service';
import { ErrorsModule } from './errors/errors.module';
import { TemplatesModule } from './templates/templates.module';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerWhenStable' }),
    HttpClientModule,
    AppMaterialModule,
    PwaModule,
    SwModule,
    ErrorsModule,
    TemplatesModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: true } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NoCacheInterceptorService, multi: true },
    { provide: UrlSerializer, useClass: UrlSensitiveService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private updateService: UpdatesService
  ) {
    // updateService.promptUpdate();
    // updateService.logUpdate();
    // updateService.checkForUpdate();
  }
}
