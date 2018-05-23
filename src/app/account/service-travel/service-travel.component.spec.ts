import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTravelComponent } from './service-travel.component';

describe('ServiceTravelComponent', () => {
  let component: ServiceTravelComponent;
  let fixture: ComponentFixture<ServiceTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
