import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Service} from '../../models/Service';
import {ServupService} from '../../services/servup.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceDetailsComponent implements OnInit {
  @Input() service: Service;
  @Input() formservice;
  @Input() editting = false;
  @Output() saveService: EventEmitter<any> = new EventEmitter<any>();
  constructor(private serveUpService: ServupService) { }

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
  serviceLogoUploaded(file) {
    this.formservice.controls.logo.setValue(file.file);
  }
}
