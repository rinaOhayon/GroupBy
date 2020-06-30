import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyexamplesComponent } from './myexamples.component';

describe('MyexamplesComponent', () => {
  let component: MyexamplesComponent;
  let fixture: ComponentFixture<MyexamplesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyexamplesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyexamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
