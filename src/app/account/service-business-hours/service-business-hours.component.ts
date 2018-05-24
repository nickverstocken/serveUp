import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Service} from '../../models/Service';

@Component({
  selector: 'app-service-business-hours',
  templateUrl: './service-business-hours.component.html',
  styleUrls: ['./service-business-hours.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceBusinessHoursComponent implements OnInit {
  @Input() service: Service;
  @Input() formservice;
  @Input() editting = false;
  @Output() saveService: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  cancelEdit(){
    this.editting = false;
    this.rebuildForm();
  }
  save(){
    this.editting = false;
    this.saveService.emit();
  }
  rebuildForm() {
    this.formservice.reset(this.service);
  }
  daysSelected(event){
      this.formservice.controls.business_hours.setValue(event);
  }
}
