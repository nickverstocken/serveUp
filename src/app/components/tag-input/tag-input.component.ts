import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Tag} from '../../models/Tag';

declare var $: any;

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {
  tags: Tag[] = [];
  newTag: Tag = new Tag();
  @Output() tagAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() tagRemoved: EventEmitter<any> = new EventEmitter<any>();
  @Input() tagsin;
  @Input() disabled = false;
  constructor() {
  }

  ngOnInit() {

  }

  addTag(event) {
    if(!this.disabled){
      var code = event.which;
      if (code === 32 || code === 13 || code === 188 || code === 186) {
        event.preventDefault();
        this.newTag.name !== '' ? this.newTag.name = this.newTag.name.trim() : '';
        if (this.tagsin.length !== 10) {
          if (this.newTag.name !== '' && this.tagsin.filter(tag => tag.name.toLocaleLowerCase() === this.newTag.name.toLocaleLowerCase()).length === 0) {
            this.newTag.name = this.newTag.name.trim();
            this.tagsin.push(this.newTag);
            this.tagAdded.emit(this.newTag);
            this.newTag = new Tag();
            if (this.tagsin.length === 10) {
              $('#tagInput').hide();
            }
          } else {
            this.newTag = new Tag();
          }
        } else {
          this.newTag = new Tag();
          $('#tagInput').hide();
        }
      }
    }

  }

  tagInputFocus() {
    $('#tagInput').focus();
  }

  removeTag(tag) {
    if(!this.disabled){
      this.tagRemoved.emit(tag);
      this.tagsin = this.tagsin.filter(t => t.name !== tag);
      $('#tagInput').show();
    }
  }
}
