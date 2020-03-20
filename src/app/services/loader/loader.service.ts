import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loadingStateChange = new Subject<boolean>();
  public subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router
  ) { }

  public stupRouterLoader(): void {
    const routerEventsSubs = this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart:
          this.loadingStateChange.next(true);
          break;
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError:
          this.loadingStateChange.next(false);
          break;
        default:
          break;
      }
    });
    this.subscriptions.add(routerEventsSubs);
  }

  public triggerLoading(loading: boolean): void {
    this.loadingStateChange.next(loading);
  }
}
