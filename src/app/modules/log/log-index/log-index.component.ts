import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ErrorsService } from 'src/app/services/errors/errors.service';

@Component({
  selector: 'app-log-index',
  templateUrl: './log-index.component.html',
  styleUrls: ['./log-index.component.scss']
})
export class LogIndexComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  public errorLog: Array<any>;

  constructor(
    private http: HttpClient,
    private errorService: ErrorsService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.errorService.lSObs.subscribe((item: Array<any>) => {
        item.sort((a: any, b: any) => {
          return b.time - a.time;
        });
        this.errorLog = item;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public fireClientError() {
    // throw new Error('Client Error. Shit happens :)');
    // it is not defined, ups
    // return it.happens;
  }

  public fireServerError() {
    this.subscriptions.add(
      this.http.get('https://jsonplaceholder.typicode.com/1').subscribe()
    );
  }

  public downloadErros() {
    return this.errorService.downloadErrors(this.errorLog);
  }

  public clearErrors() {
    this.errorService.clearLog();
  }
}
