import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Appointment} from '../../../models/Appointment';

@Component({
  selector: 'app-appointmentpicker',
  templateUrl: './appointmentpicker.component.html',
  styleUrls: ['./appointmentpicker.component.scss']
})

export class AppointmentpickerComponent implements OnInit{
  @Input() show = false;
  @Output() closeAppointment: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendAppointment: EventEmitter<any> = new EventEmitter<any>();
  today = new Date();
  innerWidth;
  mobile = false;
  formAppointment;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    }
    this.formAppointment = this.fb.group({
      title: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      location: [null, Validators.required]
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }
  setPlace(selectedPlace){
    this.formAppointment.controls.location.setValue(selectedPlace);
  }
  onsendAppointment(){
    this.sendAppointment.emit(this.formAppointment);
  }

}
