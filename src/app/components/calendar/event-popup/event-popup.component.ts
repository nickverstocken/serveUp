import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.scss']
})
export class EventPopupComponent implements OnInit {
  @Input() show = false;
  @Input() appointment;
  @Input() personal;
  @Input() user;
  @Output() closeEventPop: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    console.log(this.appointment);
  }
  close(){
    this.closeEventPop.emit();
  }
}
