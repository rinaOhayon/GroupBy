import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegisterViewComponent } from './group-register-view.component';

describe('GroupRegisterViewComponent', () => {
  let component: GroupRegisterViewComponent;
  let fixture: ComponentFixture<GroupRegisterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupRegisterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
