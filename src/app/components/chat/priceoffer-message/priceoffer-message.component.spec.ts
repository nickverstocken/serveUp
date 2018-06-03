import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceofferMessageComponent } from './priceoffer-message.component';

describe('PriceofferMessageComponent', () => {
  let component: PriceofferMessageComponent;
  let fixture: ComponentFixture<PriceofferMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceofferMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceofferMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
