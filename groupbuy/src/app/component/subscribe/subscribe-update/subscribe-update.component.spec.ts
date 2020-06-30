import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeUpdateComponent } from './subscribe-update.component';

describe('SubscribeUpdateComponent', () => {
  let component: SubscribeUpdateComponent;
  let fixture: ComponentFixture<SubscribeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
