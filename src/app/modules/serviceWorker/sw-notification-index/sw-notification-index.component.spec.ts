import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwNotificationIndexComponent } from './sw-notification-index.component';

describe('SwNotificationIndexComponent', () => {
  let component: SwNotificationIndexComponent;
  let fixture: ComponentFixture<SwNotificationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwNotificationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwNotificationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
