import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPushSubscription, INotificationModel, IVapidDetails } from 'src/app/shared/interfaces/pwa/sw/notification.interface';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public swRegistration: ServiceWorkerRegistration = null;
  public subscriptions: Subscription = new Subscription();
  public pushNotificationStatus = {
    isSubscribed: false,
    isSupported: false,
    isInProgress: false
  };
  public notifications: Array<any>;
  private readonly options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  public init(): void {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/assets/js/pwa/sw/sw.js')
        .then(swReg => {
          console.log('Service Worker is registered', swReg);
          this.swRegistration = swReg;
          this.checkSubscription();
        })
        .catch(error => {
          console.error('Service Worker Error', error);
        });
      this.pushNotificationStatus.isSupported = true;
    } else {
      this.pushNotificationStatus.isSupported = false;
    }
    debugger;
    navigator.serviceWorker.addEventListener('message', (event) => {
      this.notifications.push(event.data);
    });
  }

  public checkSubscription(): void {
    this.swRegistration.pushManager.getSubscription()
      .then(subs => {
        console.log(subs);
        console.log(JSON.stringify(subs));
        this.pushNotificationStatus.isSubscribed = !(subs === null);
      });
  }

  public subscribeUser(): void {
    this.pushNotificationStatus.isInProgress = true;
    const applicationServerKey = this.urlB64ToUint8Array(environment.VAPID_public_key);
    this.swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    })
      .then(subs => {
        console.log(subs);
        console.log(JSON.stringify(subs));
        const newSub = JSON.parse(JSON.stringify(subs));
        console.log(newSub);
        const model: IPushSubscription = {
          auth: newSub.keys.auth,
          p256Dh: newSub.keys.p256dh,
          endpoint: newSub.endpoint
        };
        this.subscriptions.add(
          this.subscribe(model).subscribe(s => {
            this.pushNotificationStatus.isSubscribed = true;
          })
        );
      })
      .catch(err => {
        console.log('Failed to subscribe the user: ', err);
      })
      .then(() => {
        this.pushNotificationStatus.isInProgress = false;
      });
  }

  public unsubscribeUser(): void {
    this.pushNotificationStatus.isInProgress = true;
    let sub = null;
    this.swRegistration.pushManager.getSubscription()
      .then(subs => {
        if (subs) {
          sub = JSON.parse(JSON.stringify(subs));
          return subs.unsubscribe();
        }
      })
      .catch(err => {
        console.log('Error unsunscribing', err);
      })
      .then(() => {
        const model: IPushSubscription = {
          auth: sub.keys.auth,
          p256Dh: sub.keys.p256dh,
          endpoint: sub.endpoint
        };
        this.subscriptions.add(
          this.Unsubscribe(model).subscribe(() => {
            this.pushNotificationStatus.isSubscribed = false;
            this.pushNotificationStatus.isInProgress = false;
          })
        );
      });
  }

  public toggleSubscription(): void {
    if (this.pushNotificationStatus.isSubscribed) {
      this.unsubscribeUser();
    } else {
      this.subscribeUser();
    }
  }

  private urlB64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private subscribe(sub: IPushSubscription | null): Observable<ArrayBuffer> {
    const url = `${environment.baseUrl}/api/Notification/subscribe`.replace(/[?&]$/, '');
    return this.http.post(url, JSON.stringify(sub), this.options)/*.pipe(takeUntil(this.unsubscribe$))*/;
  }

  private Unsubscribe(sub: IPushSubscription | null): Observable<ArrayBuffer> {
    const url = `${environment.baseUrl}/api/Notification/unsubscribe`.replace(/[?&]$/, '');
    return this.http.post(url, JSON.stringify(sub), this.options)/*.pipe(takeUntil(this.unsubscribe$))*/;
  }

  public Broadcast(message: INotificationModel | null): Observable<ArrayBuffer> {
    const url = `${environment.baseUrl}/api/Notification/broadcast`.replace(/[?&]$/, '');
    const vapidModel: IVapidDetails = {
      publickey: environment.VAPID_public_key,
      privatekey: environment.VAPID_private_key,
      subject: environment.baseUrl
    };
    message.vapidDetails = vapidModel;
    return this.http.post(url, JSON.stringify(message), this.options)/*.pipe(takeUntil(this.unsubscribe$))*/;
  }
}
