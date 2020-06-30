import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeViewTableComponent } from './subscribe-view-table.component';

describe('SubscribeViewTableComponent', () => {
  let component: SubscribeViewTableComponent;
  let fixture: ComponentFixture<SubscribeViewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeViewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
