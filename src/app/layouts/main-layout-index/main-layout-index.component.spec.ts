import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutIndexComponent } from './main-layout-index.component';

describe('MainLayoutIndexComponent', () => {
  let component: MainLayoutIndexComponent;
  let fixture: ComponentFixture<MainLayoutIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
