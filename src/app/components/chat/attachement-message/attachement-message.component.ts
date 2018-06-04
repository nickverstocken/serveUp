import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-attachement-message',
  templateUrl: './attachement-message.component.html',
  styleUrls: ['./attachement-message.component.scss']
})
export class AttachementMessageComponent implements OnInit {
  @Input() message;
  @Input() creator;
  showImageModal = false;
  media;
  allImages;
  currentSelectedImage;
  constructor() { }

  ngOnInit() {
    this.media = JSON.parse(this.message.message);
    this.allImages = this.media.filter(media => media.mime_type.startsWith('image/'));
  }
  clickImage(file){
    this.currentSelectedImage = file;
    this.showImageModal = true;
  }
  clickOther(file){
    window.open(
      file.path, '_blank');
  }
}
