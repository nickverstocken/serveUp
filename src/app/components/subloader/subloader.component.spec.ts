import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubloaderComponent } from './subloader.component';

describe('SubloaderComponent', () => {
  let component: SubloaderComponent;
  let fixture: ComponentFixture<SubloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
