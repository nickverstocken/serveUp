import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  dragging = false;
  loaded = false;
  imageLoaded = false;
  imageSrc = '';

  @Output() fileload: EventEmitter<any> = new EventEmitter();
  @Input() image;
  @Input() options = {};
  @Input() id;
  @Input() disabled = false;
  constructor() {

  }

  ngOnInit() {

  }
  handleDragEnter() {
    if(!this.disabled){
      this.dragging = true;
    }

  }

  handleDragLeave() {
    if(!this.disabled) {
      this.dragging = false;
    }
  }

  handleDrop(e) {
    if(!this.disabled) {
      e.preventDefault();
      this.dragging = false;
      this.handleInputChange(e);
    }
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }

    this.loaded = false;

    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);

  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.image = reader.result;
    this.loaded = true;
    const input = (<HTMLInputElement> document.getElementById(this.id));
    const fileList: FileList = input.files;
    if (fileList.length > 0) {
      this.fileload.emit({'file' : fileList[0], 'control_id' : this.id});
      $('#' + this.id).prop('value', '');
    }
  }
  mouseEnter(){
    if(!this.disabled) {
      this.dragging = true;
    }
  }
  mouseLeave(){
    if(!this.disabled) {
      this.dragging = false;
    }
  }
}
