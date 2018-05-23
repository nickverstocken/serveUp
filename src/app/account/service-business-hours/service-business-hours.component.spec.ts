import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBusinessHoursComponent } from './service-business-hours.component';

describe('ServiceBusinessHoursComponent', () => {
  let component: ServiceBusinessHoursComponent;
  let fixture: ComponentFixture<ServiceBusinessHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceBusinessHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceBusinessHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
