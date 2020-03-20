import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  public loading = false;
  public subscriptions: Subscription = new Subscription();

  constructor(
    private loaderService: LoaderService
  ) {
    this.subscriptions.add(
      loaderService.loadingStateChange.subscribe((rs: boolean) => {
        this.loading = rs;
      })
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
