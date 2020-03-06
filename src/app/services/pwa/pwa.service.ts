import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { PromptComponent } from 'src/app/pwa/prompt/prompt.component';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private plataform: Platform
  ) { }

  public initPwaPrompt() {
    if (this.plataform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.plataform.IOS) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }
  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }
}
