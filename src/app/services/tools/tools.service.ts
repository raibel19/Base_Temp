import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  public Unsusbscribe(subs: Subscription | Array<Subscription>): void {
    debugger
    if (Array.isArray(subs)) {
      subs.forEach((a, e) => {
        if (a) {
          a.unsubscribe();
        }
      });
    } else {
      if (subs) {
        subs.unsubscribe();
      }
    }
  }
}
