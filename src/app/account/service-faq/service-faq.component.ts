import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Service} from '../../models/Service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-service-faq',
  templateUrl: './service-faq.component.html',
  styleUrls: ['./service-faq.component.scss']
})
export class ServiceFaqComponent implements OnInit {
  @Input() service: Service;
  @Input() formservice;
  @Input() editting = false;
  @Output() saveService: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
