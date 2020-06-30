import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupClosedCreatedComponent } from './group-closed-created.component';

describe('GroupClosedCreatedComponent', () => {
  let component: GroupClosedCreatedComponent;
  let fixture: ComponentFixture<GroupClosedCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupClosedCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupClosedCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
