import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarFC, snackBarDefaultFC } from 'src/app/shared/models/snack-bar.model';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class SnackBarNotificationService {

  constructor(
    private toast: MatSnackBar
  ) { }

  public show(message: string, buttonLabel: string = 'OK', toastTimeout: number = 8000): MatSnackBarRef<any> {
    // const toastTimeout = 8000;
    if (toastTimeout > 0) {
      return this.toast.open(message, buttonLabel, {
        duration: toastTimeout
      });
    } else {
      return this.toast.open(message, buttonLabel, {});
    }
  }

  public showForComponent(component: ComponentType<any>, override?: Partial<SnackBarFC>): MatSnackBarRef<any> {
    const data = Object.assign({}, snackBarDefaultFC.data, override.data);
    const merge = Object.assign({}, snackBarDefaultFC, override);
    merge.data = data;

    return this.toast.openFromComponent(component, {
      politeness: merge.politeness,
      announcementMessage: merge.announcementMessage,
      viewContainerRef: merge.viewContainerRef,
      duration: merge.duration,
      panelClass: merge.panelClass,
      direction: merge.direction,
      data: merge.data,
      horizontalPosition: merge.horizontalPosition,
      verticalPosition: merge.verticalPosition
    });
  }

  public showForTemplate(template: TemplateRef<any>, override?: Partial<SnackBarFC>): MatSnackBarRef<any> {
    const data = Object.assign({}, snackBarDefaultFC.data, override.data);
    const merge = Object.assign({}, snackBarDefaultFC, override);
    merge.data = data;

    return this.toast.openFromTemplate(template, {
      politeness: merge.politeness,
      announcementMessage: merge.announcementMessage,
      viewContainerRef: merge.viewContainerRef,
      duration: merge.duration,
      panelClass: merge.panelClass,
      direction: merge.direction,
      data: merge.data,
      horizontalPosition: merge.horizontalPosition,
      verticalPosition: merge.verticalPosition
    });
  }
}
