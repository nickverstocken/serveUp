import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutofillCitiesComponent } from './autofill-cities.component';

describe('AutofillCitiesComponent', () => {
  let component: AutofillCitiesComponent;
  let fixture: ComponentFixture<AutofillCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutofillCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutofillCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
