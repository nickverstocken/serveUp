import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPriceListComponent } from './user-price-list.component';

describe('UserPriceListComponent', () => {
  let component: UserPriceListComponent;
  let fixture: ComponentFixture<UserPriceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
