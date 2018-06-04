import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  dragging = false;
  loaded = false;
  fileLoaded = false;
  edit = false;
  @Output() fileload: EventEmitter<any> = new EventEmitter();
  @Output() removeFile: EventEmitter<any> = new EventEmitter();
  @Output() imageClicked: EventEmitter<any> = new EventEmitter();
  @Input() files = new Array(0);
  @Input() show = false;
  @Output() filesloading: EventEmitter<any> = new EventEmitter();
  @Output() closeFileUpload: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendFiles: EventEmitter<any> = new EventEmitter<any>();
  @Input() options = {
  };
  loadCount = 0;

  constructor() {
  }

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

  handleFilesLoad() {
    this.fileLoaded = true;
  }

  clickImage(file) {
    this.removeImage(file);
  }

  removeImage(file) {
    this.removeFile.emit(file);
    this.files = this.files.filter(img => img !== file);
  }

  handleInputChange(e) {
    this.loadCount = 0;
    this.filesloading.emit();
    this.edit = false;
    let files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
 /*   const pattern = /image-*!/;*/
    let length = files.length;
    if(files.length > 15){
      alert('Er kunnen maximaal 15 bestanden worden verstuurd...');
      length = 15;
      files = Array.prototype.slice.call( files, 0, 15 );
    }
    Object.keys(files).forEach(i => {
      const file = files[i];
      const reader = new FileReader();
      this.loaded = false;
      reader.onload = (e) => {
        if(file.size < 2000000){
          let document: any = [];
          document.filepath = reader.result;
          document.mime_type = file.type;
          document.name = file.name;
          document.fileObject = file;
          this.files.push(document);
        }else{
          alert(file.name + ' is te groot ( > 2MB) en wordt dus niet toegevoegd...');
        }

        this.loadCount += 1;

        if (this.loadCount !== length) {
        } else {
          this.fileload.emit(files);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  mouseEnter() {
    this.dragging = true;
  }

  mouseLeave() {
    this.dragging = false;
  }

  onsendFiles() {
    this.sendFiles.emit(this.files);
  }
}
