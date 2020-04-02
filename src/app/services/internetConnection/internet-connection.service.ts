import { Injectable, NgZone } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, Subscription, BehaviorSubject, fromEvent } from 'rxjs';
import { SnackBarNotificationService } from '../snackBarNotification/snack-bar-notification.service';
import { SnackbarIndexComponent } from 'src/app/templates/snackbar/snackbar-index/snackbar-index.component';
import { SnackBarIcons } from 'src/app/shared/models/snack-bar.model';

@Injectable({
  providedIn: 'root'
})
export class InternetConnectionService implements CanActivate {
  private onlineEventObs: Observable<Event>;
  private offlineEventObs: Observable<Event>;
  private subscriptions: Subscription = new Subscription();
  public statusInternetConection: BehaviorSubject<boolean>;

  constructor(
    private zone: NgZone,
    private snackBarService: SnackBarNotificationService
  ) {
    this.onlineEventObs = fromEvent(window, 'online');
    this.offlineEventObs = fromEvent(window, 'offline');

    this.startInternetConnection();
    this.statusInternetConection = new BehaviorSubject<boolean>(true);
  }

  public canActivate(): boolean {
    // debugger
    if (!navigator.onLine) {
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
      this.statusInternetConection.next(false);
      return false;
    }
    this.statusInternetConection.next(true);
    return true;
  }

  private onlineEvent(): void {
    this.subscriptions.add(
      this.onlineEventObs.subscribe(e => {
        this.statusInternetConection.next(true);
        this.zone.run(() =>
          this.snackBarService.showForComponent(SnackbarIndexComponent, {
            data: {
              message: 'De vuelta en línea',
              icon: SnackBarIcons.wiffiOn,
              colorIcon: 'white',
              closeBtn: false
            },
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        );
      })
    );
  }

  private offlineEvent(): void {
    this.subscriptions.add(
      this.offlineEventObs.subscribe(e => {
        this.statusInternetConection.next(false);
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
      })
    );
  }

  private startInternetConnection(): void {
    this.onlineEvent();
    this.offlineEvent();
  }

  public onDestroy() {
    this.subscriptions.unsubscribe();
  }
}
