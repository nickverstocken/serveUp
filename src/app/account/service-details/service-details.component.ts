import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Service} from '../../models/Service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceDetailsComponent implements OnInit {
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
