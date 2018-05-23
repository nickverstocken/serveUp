import {Component, Input, OnInit} from '@angular/core';
import {Service} from '../../models/Service';

@Component({
  selector: 'app-service-description',
  templateUrl: './service-description.component.html',
  styleUrls: ['./service-description.component.scss']
})
export class ServiceDescriptionComponent implements OnInit {
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
