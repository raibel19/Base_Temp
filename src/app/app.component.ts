import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from './services/pwa/sw/notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public subsNotificationClicks: Subscription = null;
  title = 'Base_Temp';

  constructor(
    private notificationsService: NotificationsService
  ) {
    debugger
    notificationsService.init();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.notificationsService.subscriptions.unsubscribe();
  }
}
