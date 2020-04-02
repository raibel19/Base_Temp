import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutMenuComponent } from './main-layout-menu.component';

describe('MainLayoutMenuComponent', () => {
  let component: MainLayoutMenuComponent;
  let fixture: ComponentFixture<MainLayoutMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
