import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-multiple-image-uploader',
  templateUrl: './multiple-image-uploader.component.html',
  styleUrls: ['./multiple-image-uploader.component.scss']
})
export class MultipleImageUploaderComponent implements OnInit {

  dragging = false;
  loaded = false;
  imageLoaded = false;
  edit = false;
  @Output() fileload: EventEmitter<any> = new EventEmitter();
  @Output() removeFile: EventEmitter<any> = new EventEmitter();
  @Output() imageClicked: EventEmitter<any> = new EventEmitter();
  @Input() images:any;
  @Output() filesloading: EventEmitter<any> = new EventEmitter();
  @Input() options = {};
  loadCount = 0;
  constructor() { }

  ngOnInit() {
  }
  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad() {
    this.imageLoaded = true;
  }
  clickImage(image){
    if(this.edit){
      this.removeImage(image);
    }else{
     this.imageClicked.emit(image);
    }
  }
  editImages($event){
    if(this.edit){
      this.edit = false;
    }else{
      this.edit = true;
    }
  }
  removeImage(image){
    this.removeFile.emit(image);
    this.images = this.images.filter(img => img !== image);
  }
  handleInputChange(e) {
    this.loadCount = 0;
    this.filesloading.emit();
    this.edit = false;
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const pattern = /image-*/;
    const length = files.length;
    Object.keys(files).forEach(i => {
      const file = files[i];
      const reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      this.loaded = false;
      console.log(this.loadCount);
      reader.onload = (e) => {
        let document: any = null;
        document.filepath = reader.result;
        this.images.push(document);
        this.loadCount += 1;

        if(this.loadCount !== length){
        }else{
          this.fileload.emit(files);
        }
      }
      reader.readAsDataURL(file);
    });
  }
  mouseEnter(){
    this.dragging = true;
  }
  mouseLeave(){
    this.dragging = false;
  }

}
