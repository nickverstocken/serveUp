import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-tab',
  template: ''
})
export class TabComponent implements OnInit {
  @Input() name: string;
  @Input() value: string;
  @Input() icon:string;
  @Input() templateRef: TemplateRef<any>;
  constructor() { }

  ngOnInit() {
  }

}
