import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { SnackBarNotificationService } from 'src/app/services/snackBarNotification/snack-bar-notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from 'src/app/services/errors/errors.service';
import { Router } from '@angular/router';
import { SnackbarIndexComponent } from '../../templates/snackbar/snackbar-index/snackbar-index.component';
import { SnackBarIcons } from 'src/app/shared/models/snack-bar.model';
import { httpStatus } from 'src/app/shared/models/errors.model';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(
        private injector: Injector,
        private zone: NgZone,
        private snackBarService: SnackBarNotificationService
    ) { }

    handleError(error: Error | HttpErrorResponse) {
        const errorsService = this.injector.get(ErrorsService);
        const router = this.injector.get(Router);

        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
                errorsService.logToServe(error, true, false).subscribe(errorWhitContectInfo => {
                    // this.zone.run(() => router.navigate(['/error'], { queryParams: errorWhitContectInfo }));
                    this.zone.run(() =>
                        this.snackBarService.showForComponent(SnackbarIndexComponent, {
                            data: {
                                message: '¡Conexión Perdida! No estás conectado a internet',
                                icon: SnackBarIcons.wiffiOff,
                                colorIcon: 'white',
                                closeBtn: false
                            },
                            horizontalPosition: 'center',
                            verticalPosition: 'bottom'
                        })
                    );
                });
            } else {
                // Handle Http Error (error.status === 403, 404...)
                // Send error to server --NOTA: cambiar el post fake por el que usará en su proyecto.
                if (error.status === 0) {
                    errorsService.logToServe(error, true, false).subscribe(errorWhitContectInfo => {
                        const messageView = this.messageErrorView(error);
                        this.zone.run(() =>
                            this.snackBarService.showForComponent(SnackbarIndexComponent, {
                                data: {
                                    message: `${error.status}: ${messageView}`,
                                    icon: SnackBarIcons.bug,
                                    colorIcon: 'red',
                                    bugFlag: true
                                }
                            })
                        );
                    });
                } else {
                    errorsService.logToServe(error, true, false).subscribe(errorWhitContectInfo => {
                        const messageView = this.messageErrorView(error);
                        this.zone.run(() =>
                            this.snackBarService.showForComponent(SnackbarIndexComponent, {
                                data: {
                                    message: `${error.status}: ${messageView}`,
                                    icon: SnackBarIcons.bug,
                                    colorIcon: 'red',
                                    bugFlag: true
                                }
                            })
                        );
                    });
                }
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)
            if (!navigator.onLine) {
                // Handle offline error
                errorsService.logToServe(error, true, false).subscribe(errorWhitContectInfo => {
                    // this.zone.run(() => router.navigate(['/error'], { queryParams: errorWhitContectInfo }));
                    this.zone.run(() =>
                        this.snackBarService.showForComponent(SnackbarIndexComponent, {
                            data: {
                                message: '¡Conexión Perdida! No estás conectado a internet',
                                icon: SnackBarIcons.wiffiOff,
                                colorIcon: 'white',
                                closeBtn: false
                            },
                            horizontalPosition: 'center',
                            verticalPosition: 'bottom'
                        })
                    );
                });
            } else {
                // Send error to server and redirect he user to the page  with all the info
                // --NOTA: cambiar el post fake por el que usará en su proyecto.
                errorsService.logToServe(error, true, false).subscribe(errorWhitContectInfo => {
                    // this.zone.run(() => router.navigate(['/error'], { queryParams: errorWhitContectInfo }));
                    this.zone.run(() =>
                        this.snackBarService.showForComponent(SnackbarIndexComponent, {
                            data: {
                                message: 'Ha ocurrido un error',
                                icon: SnackBarIcons.bug,
                                colorIcon: 'red',
                                bugFlag: true
                            }
                        })
                    );
                });
            }
        }
        // Log the error anyway
        // console.error('It happens: ', error);
    }

    private messageErrorView(error: HttpErrorResponse): string {
        const errorForClient = httpStatus[error.status];
        const messageForClient = !errorForClient ? '' : errorForClient[1];
        const messageForDV = !error.error.message ? (!error.message ? '' : error.message) : error.error.message;
        return !messageForClient ? messageForDV : messageForClient;
    }
}