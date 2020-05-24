import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService } from './services/pwa/sw/notifications/notifications.service';
import { LoaderService } from './services/loader/loader.service';
import { InternetConnectionService } from './services/internetConnection/internet-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Base_Temp';

  constructor(
    private notificationsService: NotificationsService,
    private loaderService: LoaderService,
    private internetConnectionService: InternetConnectionService
  ) {
    this.preloadElements();
    notificationsService.init();
    loaderService.stupRouterLoader();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.loaderService.subscriptions.unsubscribe();
    this.notificationsService.subscriptions.unsubscribe();
    this.internetConnectionService.onDestroy();
  }

  private preloadElements(): void {
    // const preloadElement = document.createElement('link');
    // preloadElement.rel = 'preload';
    // preloadElement.as = 'style';
    // preloadElement.href = 'lazy-fonts.css';
    // preloadElement.type = 'text/css';
    // document.head.appendChild(preloadElement);

    // const lazyStyleElement = document.createElement('link');
    // lazyStyleElement.rel = 'stylesheet';
    // lazyStyleElement.href = 'lazy-fonts.css';
    // lazyStyleElement.type = 'text/css';
    // lazyStyleElement.media = 'none';
    // lazyStyleElement.onload = () => { if (lazyStyleElement.media !== 'all') { lazyStyleElement.media = 'all'; } };
    // document.head.appendChild(lazyStyleElement);

    const preloadLazyStylesElement = document.createElement('link');
    preloadLazyStylesElement.rel = 'preload';
    preloadLazyStylesElement.as = 'style';
    preloadLazyStylesElement.href = 'lazy-styles.css';
    preloadLazyStylesElement.type = 'text/css';
    preloadLazyStylesElement.media = '';
    preloadLazyStylesElement.onload = () => {
      preloadLazyStylesElement.rel = 'stylesheet';
      if (preloadLazyStylesElement.media !== 'all') {
        preloadLazyStylesElement.media = 'all';
      }
    };
    document.head.appendChild(preloadLazyStylesElement);
  }
}
