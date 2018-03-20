import {Component, OnInit} from '@angular/core';
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

  constructor() {
  }

  ngOnInit() {

  }

  addTag(event) {
    var code = event.which;
    if (code === 32 || code === 13 || code === 188 || code === 186) {
      event.preventDefault();
      this.newTag.name !== '' ? this.newTag.name = this.newTag.name.trim() : '';
      if(this.tags.length !== 10){
        if(this.newTag.name !== '' && this.tags.filter(tag => tag.name.toLocaleLowerCase() === this.newTag.name.toLocaleLowerCase()).length === 0){
          this.newTag.name = this.newTag.name.trim();
          this.tags.push(this.newTag);
          this.newTag = new Tag();
          if(this.tags.length === 10){
            $('#tagInput').hide();
          }
        }else{
          this.newTag = new Tag();
        }
      }else{
        this.newTag = new Tag();
        $('#tagInput').hide();
      }

    }
  }
  tagInputFocus(){
    $('#tagInput').focus();
  }
  removeTag(tag){
    this.tags = this.tags.filter(t => t.name !== tag);
    $('#tagInput').show();
  }
}
