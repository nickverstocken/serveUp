import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent implements OnInit {
  @Input() show;
  @Input() images = [];
  @Output() closePopup: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() addFiles: EventEmitter<any> = new EventEmitter();
  @Output() clickedImage: EventEmitter<any> = new EventEmitter();
  uploaderOptions = {width: '66px', height: '66px', 'border-radius': '4px'};
  formData: FormData;
  loading: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  fileLoading() {
    this.loading = true;
  }

  close($event) {
    this.closePopup.emit();
  }

  filesLoaded(files) {
    this.formData = new FormData();
    let fileCount: number = files.length;
    if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        this.formData.append('files[]', files[i]);
      }
    }
    this.addFiles.emit({
      'formdata': this.formData
    });
    this.loading = false;
  }

  deleteFile(document) {
    this.delete.emit(document);
  }

  openImageModal(image) {
    this.clickedImage.emit(image);

  }
}
