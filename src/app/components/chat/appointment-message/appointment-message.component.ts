import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../../../models/Appointment';
import {ServupService} from '../../../services/servup.service';

@Component({
  selector: 'app-appointment-message',
  templateUrl: './appointment-message.component.html',
  styleUrls: ['./appointment-message.component.scss']
})
export class AppointmentMessageComponent implements OnInit {
  @Input() message;
  @Input() creator;
  @Output() onCancelAppointment: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancelOwnAppointment: EventEmitter<any> = new EventEmitter<any>();
  @Output() onApproveAppointment: EventEmitter<any> = new EventEmitter<any>();
  appointment;
  constructor(private serveupService: ServupService) { }

  ngOnInit() {
    this.appointment = JSON.parse(this.message.message);
    if(this.appointment.location){
      if(!this.appointment.location.address){
        this.appointment.location = JSON.parse(this.appointment.location);
      }
    }
  }
  cancelAppointment(id){
    this.onCancelAppointment.emit(this.message);
  }
  approveAppointment(id){
    this.onApproveAppointment.emit(this.message);
  }
  cancelOwnAppointment(id){
    this.onCancelOwnAppointment.emit(this.message);
  }
}
