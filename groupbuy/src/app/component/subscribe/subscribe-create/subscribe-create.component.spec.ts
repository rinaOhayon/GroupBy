import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeCreateComponent } from './subscribe-create.component';

describe('SubscribeCreateComponent', () => {
  let component: SubscribeCreateComponent;
  let fixture: ComponentFixture<SubscribeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
