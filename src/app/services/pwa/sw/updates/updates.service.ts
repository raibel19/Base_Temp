import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { interval, concat } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  constructor(
    private appRef: ApplicationRef,
    private updates: SwUpdate,
    private snackbar: MatSnackBar) { }

  public checkForUpdate() {
    // Allow the app to stabilize first, before starting polling for updates with `interval()`.
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());
  }

  public logUpdate() {
    this.updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }

  public promptUpdate() {
    this.updates.available.subscribe(evt => {
      const snack = this.snackbar.open('Actualización disponible', 'Recargar');
      snack
        .onAction()
        .subscribe(() => {
          this.updates.activateUpdate().then(() => document.location.reload());
        });

      setTimeout(() => {
        snack.dismiss();
      }, 180000);
      // this.updates.activateUpdate().then(() => document.location.reload());
    });
  }
}
