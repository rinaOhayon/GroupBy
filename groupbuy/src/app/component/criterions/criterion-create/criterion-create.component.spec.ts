import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionCreateComponent } from './criterion-create.component';

describe('CriterionCreateComponent', () => {
  let component: CriterionCreateComponent;
  let fixture: ComponentFixture<CriterionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriterionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriterionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
