import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceofferComponent } from './priceoffer.component';

describe('PriceofferComponent', () => {
  let component: PriceofferComponent;
  let fixture: ComponentFixture<PriceofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
