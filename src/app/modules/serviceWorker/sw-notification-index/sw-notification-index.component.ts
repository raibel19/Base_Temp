import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificationsService } from 'src/app/services/pwa/sw/notifications/notifications.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { INotificationModel } from 'src/app/shared/interfaces/pwa/sw/notification.interface';

@Component({
  selector: 'app-sw-notification-index',
  templateUrl: './sw-notification-index.component.html',
  styleUrls: ['./sw-notification-index.component.scss']
})
export class SwNotificationIndexComponent implements OnInit, OnDestroy {
  public isEnable = this.swPush.isEnabled;
  public isGranted = Notification.permission === 'granted';
  public notificationFG: FormGroup;

  constructor(
    private swPush: SwPush,
    public notificationService: NotificationsService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void { }

  private buildForm(): void {
    this.notificationFG = this.formBuilder.group({
      'input-notification-title': ['', [Validators.required]],
      'input-notification-message': ['', [Validators.required]],
      'input-notification-url': ['', [Validators.required]]
    });
  }

  public toggleSubscription(): void {
    this.notificationService.toggleSubscription();
  }

  public cleanUrl(url: string) {
    if (!url) {
      return '';
    }
    if (url.indexOf(self.location.origin) >= 0) {
      return url.replace(self.location.origin, '');
    }
    return url;
  }

  public removeNotif(notif: string) {
    if (!notif) {
      return;
    }
    const index = this.notificationService.notifications.indexOf(notif);
    if (index >= 0) {
      this.notificationService.notifications.splice(index, 1);
    }
  }

  public broadcast() {
    const notValues = this.notificationFG.value;
    const model: INotificationModel = {
      title: notValues['input-notification-title'],
      message: notValues['input-notification-message'],
      url: notValues['input-notification-url'],
    };
    this.notificationService.subscriptions.add(
      this.notificationService.Broadcast(model).subscribe(sb => {
        this.notificationFG.reset();
      })
    );
  }
}
