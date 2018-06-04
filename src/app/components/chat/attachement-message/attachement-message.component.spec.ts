import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachementMessageComponent } from './attachement-message.component';

describe('AttachementMessageComponent', () => {
  let component: AttachementMessageComponent;
  let fixture: ComponentFixture<AttachementMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachementMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachementMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
