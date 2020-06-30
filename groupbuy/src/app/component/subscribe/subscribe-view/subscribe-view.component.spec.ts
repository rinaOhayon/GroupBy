import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeViewComponent } from './subscribe-view.component';

describe('SubscribeViewComponent', () => {
  let component: SubscribeViewComponent;
  let fixture: ComponentFixture<SubscribeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
