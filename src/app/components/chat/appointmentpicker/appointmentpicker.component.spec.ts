import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentpickerComponent } from './appointmentpicker.component';

describe('AppointmentpickerComponent', () => {
  let component: AppointmentpickerComponent;
  let fixture: ComponentFixture<AppointmentpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
