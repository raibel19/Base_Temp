import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy, AfterViewChecked {
  public loading = false;
  public subscriptions: Subscription = new Subscription();

  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.subscriptions.add(
      loaderService.loadingStateChange.subscribe((rs: boolean) => {
        this.loading = rs;
        this.cdr.detectChanges();
      })
    );
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
