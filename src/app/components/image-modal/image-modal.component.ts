import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Media} from '../../models/Media';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
  @Input() show = false;
  @Input() selectedMedia: Media;
  @Input() allMedia: Media[];
  @Input() title;
  @Output() closePopup: EventEmitter<any> = new EventEmitter();

  constructor() {
  }
  ngOnInit() {
  }

  nextImage() {
    const index = this.allMedia.indexOf(this.selectedMedia);
    if (index >= 0 && index < this.allMedia.length - 1) {
      this.selectedMedia = this.allMedia[index + 1];
    } else {
      this.selectedMedia = this.allMedia[0];
    }
  }
  close($event){
    this.closePopup.emit();
  }

}
