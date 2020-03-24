import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogIndexComponent } from './log-index.component';

describe('LogIndexComponent', () => {
  let component: LogIndexComponent;
  let fixture: ComponentFixture<LogIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
