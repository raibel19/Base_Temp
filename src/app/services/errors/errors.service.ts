import { Injectable, Injector, NgZone, Type } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router, NavigationError } from '@angular/router';
import { FormGroup } from '@angular/forms';
// ERROR STACK
import * as StackTraceParser from 'error-stack-parser';
// MOMENT
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
const moment = _rollupMoment || _moment;
import 'moment/min/locales';
// SHARES VARIABLES
import { SHARED_VARIABLES } from 'src/app/shared/variables.shared';
// GUID
import { Guid } from 'guid-typescript';
// STREAM SERVER
import { saveAs } from 'file-saver';
// MODELS
import { Error } from 'src/app/shared/models/errors.model';

class ErrorToSendModel {
  name: any;
  appId: string;
  user: string;
  time: number;
  timestamp: _moment.Moment;
  timestampFormat: string;
  id: string;
  identifier: string;
  url: string;
  status: any;
  message: any;
  stack: StackTraceParser.StackFrame[];

  constructor(model: ErrorToSendModel) {
    this.name = model.name;
    this.appId = model.appId;
    this.user = model.user;
    this.time = model.time;
    this.timestamp = model.timestamp;
    this.timestampFormat = model.timestampFormat;
    this.id = model.id;
    this.identifier = model.identifier;
    this.url = model.url;
    this.status = model.status;
    this.message = model.message;
    this.stack = model.stack;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  private uri = '';
  private postSendErrorToServiceUri = '';
  private errorLog: Array<any> = JSON.parse(sessionStorage.getItem('errorLog')) || [];
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': this.uri,
      Allow: 'GET, POST, OPTIONS, PUT, DELETE'
    })
  };
  public lSObs: BehaviorSubject<any>;

  constructor(
    private injector: Injector,
    private http: HttpClient,
    private router: Router,
    private zone: NgZone
  ) {
    this.uri = '';
    this.postSendErrorToServiceUri = `${this.uri}/senderror`;
    this.lSObs = new BehaviorSubject<any>(this.errorLog);

    // Subscribe to the NavigatorError
    this.router.events.subscribe(event => {
      if (event instanceof NavigationError) {
        // Redirect to the ErrorComponent
        if (navigator.onLine) {
          this.logToServe(event.error, true, false).subscribe((errorWithContext) => {
            zone.run(() => router.navigate(['/error'], { queryParams: errorWithContext }));
          });
        }
      }
    });
  }

  public getError(controlName: string, formGroup: FormGroup, errorIntf?: Array<Error>, isSubmit: boolean = false): string {
    // debugger;
    let error = null;
    const control = formGroup.get(controlName);
    for (const item in control.errors) {
      if (isSubmit && control.errors != null) {
        if (item === 'customMessage') {
          error = control.errors[item];
        } else {
          error = this.getValidatorErrorMessage(item, control.errors[item], errorIntf);
        }
      } else {
        if ((control.dirty || control.touched) && control.errors != null) {
          // error = JSON.stringify(control.errors);
          if (item === 'customMessage') {
            error = control.errors[item];
          } else {
            error = this.getValidatorErrorMessage(item, control.errors[item], errorIntf);
          }
        }
      }
    }
    return error;
  }

  private getValidatorErrorMessage(validatorName: string, validatorValue?: any, errorIntf?: Array<Error>): Array<any> {
    // debugger;
    const errorList: Array<any> = [];
    if (errorIntf) {
      errorIntf.forEach(fe => {
        if (validatorName === fe.errorType) {
          errorList[fe.errorType] = fe.message;
        }
      });
    }
    // const config = {
    //   required: 'El campo es requerido',
    //   minlength: `Caracteres mínimos ${validatorValue.requiredLength}`,
    //   maxlength: `Caracteres máximos ${validatorValue.requiredLength}`
    // };
    return errorList[validatorName];
  }

  public logToServe(error: any, saveSession: boolean = false, saveServer: boolean = true): Observable<any> {
    // send error to server
    const errorToSend = this.addContextInfo(error);
    if (saveSession) {
      let errorLogVar: Array<any> = [];
      errorLogVar = JSON.parse(sessionStorage.getItem('errorLog')) || [];
      errorLogVar.push(errorToSend);
      sessionStorage.setItem('errorLog', JSON.stringify(errorLogVar));

      this.errorLog = JSON.parse(sessionStorage.getItem('errorLog')) || [];
      this.lSObs.next(this.errorLog);
      if (!saveServer) {
        return this.fakeHttoSendErrorToService(errorToSend);
      }
    }
    if (saveServer) {
      // Remover comentario cuando se tenga el servicio de errores en el servidor
      // return this.postSendErrorToService(errorToSend);
      // Por ahora solo se usará una llamada fake
      return this.fakeHttoSendErrorToService(errorToSend);
    }
  }

  public log(error: any): ErrorToSendModel {
    // log the error to the cnsole
    console.error(error);
    // send error to server
    return this.addContextInfo(error);
  }

  private addContextInfo(error: any): ErrorToSendModel {
    // All the context details that you want (usually coming from other services; Constants, UserService...)
    const name = error.name || null;
    const appId = SHARED_VARIABLES.APP_TITLE;
    const user = 'User'; // Nombre del usuario en sesión
    const time = new Date().getTime();
    const timestamp = moment().utc();
    const timestampFormat = moment(timestamp).local().format('DD/MM/YYYY HH:mm:ss A');
    const id = `${appId}-${user}-${time}`;
    const identifier = Guid.raw();
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);

    const errorToSend = new ErrorToSendModel(
      { name, appId, user, time, timestamp, timestampFormat, id, identifier, url, status, message, stack }
    );
    return errorToSend;
  }

  private postSendErrorToService(model: ErrorToSendModel): Observable<any> {
    return this.http.post<any>(this.postSendErrorToServiceUri, model, this.httpOptions);
  }

  private fakeHttoSendErrorToService(model: ErrorToSendModel): Observable<any> {
    console.log('Error sent to the server: ', model);
    return of(model);
  }

  public downloadErrors(errorsArray: Array<any>): void {
    // const Blob = BlobPolyfill.Blob;
    const create = new Blob([JSON.stringify(errorsArray)], { type: 'application/json;charset=utf-8' });
    saveAs(create, `errors ${moment.utc().format('DD-MM-YYYY HH-mm-ss A')}.json`);
  }

  public getErrors(): Array<any> {
    return JSON.parse(sessionStorage.getItem('errorLog')) || [];
  }

  public clearLog(): void {
    sessionStorage.removeItem('errorLog');
    this.errorLog = JSON.parse(sessionStorage.getItem('errorLog')) || [];
    this.lSObs.next(this.errorLog);
  }
}
