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
    'width': '50px',
    'height': '50px',
    'border-radius': '4px'
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

  handleImageLoad() {
    this.fileLoaded = true;
  }

  clickImage(image) {
    if (this.edit) {
      this.removeImage(image);
    } else {
      this.imageClicked.emit(image);
    }
  }

  editImages($event) {
    if (this.edit) {
      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  removeImage(image) {
    this.removeFile.emit(image);
    this.files = this.files.filter(img => img !== image);
  }

  handleInputChange(e) {
    this.loadCount = 0;
    this.filesloading.emit();
    this.edit = false;
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
 /*   const pattern = /image-*!/;*/
    const length = files.length;
    Object.keys(files).forEach(i => {
      const file = files[i];
      const reader = new FileReader();
/*      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }*/
      this.loaded = false;
      reader.onload = (e) => {
        let document: any = [];
        document.filepath = reader.result;
        document.mime_type = files[i].type;
        this.files.push(document);
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
