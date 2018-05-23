import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
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
  editting = false;
  constructor() { }

  ngOnInit() {
  }
  cancelEdit(){
    this.editting = false;
    this.rebuildForm();
  }
  save(){
    this.editting = false;
  }
  rebuildForm() {
    this.formservice.reset(this.service);
  }
}
