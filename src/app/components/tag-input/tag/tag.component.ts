import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Tag} from '../../../models/Tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() name;
  @Output() tagRemove: EventEmitter<Tag> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  removeTag(){
    this.tagRemove.emit(this.name);
  }
}
