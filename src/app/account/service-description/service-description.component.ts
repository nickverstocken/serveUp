import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../models/Service';
import {ServupService} from '../../services/servup.service';

@Component({
  selector: 'app-service-description',
  templateUrl: './service-description.component.html',
  styleUrls: ['./service-description.component.scss']
})
export class ServiceDescriptionComponent implements OnInit {
  @Input() service: Service;
  @Input() formservice;
  @Input() editting = false;
  @Output() onEditting: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveService: EventEmitter<any> = new EventEmitter<any>();
  categories;

  constructor(private serveUpService: ServupService) { }

  ngOnInit() {
    this.serveUpService.getCategories('subcategories').subscribe(result => {
      this.categories = result.categories;
    });
  }
  cancelEdit(){
    this.editting = false;
    this.rebuildForm();
  }
  onEdit(){
    this.onEditting.emit('service-description');
  }
  save(){
    this.editting = false;
    this.saveService.emit();
  }
  rebuildForm() {
    this.formservice.reset(this.service);
  }
}
