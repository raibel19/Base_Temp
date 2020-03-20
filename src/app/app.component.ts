import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from './services/pwa/sw/notifications/notifications.service';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Base_Temp';

  constructor(
    private notificationsService: NotificationsService,
    private loaderService: LoaderService
  ) {
    notificationsService.init();
    loaderService.stupRouterLoader();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.loaderService.subscriptions.unsubscribe();
    this.notificationsService.subscriptions.unsubscribe();
  }
}
