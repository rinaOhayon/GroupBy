import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRegisterComponent } from './group-register.component';

describe('GroupRegisterComponent', () => {
  let component: GroupRegisterComponent;
  let fixture: ComponentFixture<GroupRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
