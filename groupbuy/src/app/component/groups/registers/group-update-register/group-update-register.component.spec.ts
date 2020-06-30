import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUpdateRegisterComponent } from './group-update-register.component';

describe('GroupUpdateRegisterComponent', () => {
  let component: GroupUpdateRegisterComponent;
  let fixture: ComponentFixture<GroupUpdateRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupUpdateRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupUpdateRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
