import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpReadComponent } from './emp-read.component';

describe('EmpReadComponent', () => {
  let component: EmpReadComponent;
  let fixture: ComponentFixture<EmpReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
