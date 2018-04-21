import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServupService} from '../../services/servup.service';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {
  @Input() request;
  @Output() onDeleted: EventEmitter<any> = new EventEmitter<any>();
  editmode = false;

  constructor(private servupService: ServupService) { }

  ngOnInit() {
  }
  editMode(){
    if(!this.editmode){
      this.editmode = true;
    }
  }
  deleteRequest(){
    this.editmode = false;
    this.servupService.deleteRequest(this.request.id).subscribe(
      result => {
        if(result.success){
          this.onDeleted.emit(this.request);
        }
      });
  }
  editRequest(){
    let val = document.getElementById('reqtitle' + this.request.id).textContent;
    if(this.request.title.trim() !== val.trim() && val.trim() !== '') {
      this.request.title = val;
      this.servupService.updateRequest(this.request).subscribe(
        result => {
          if(result.success){
            this.request = result.request;
          }
        });
    }else{
      document.getElementById('reqtitle' + this.request.id).textContent = this.request.title;
    }

    this.editmode = false;
  }
  keyPress(e){
    if (e.keyCode === 13 && !e.shiftKey)
    {
      this.editRequest();
      e.preventDefault();
    }
  }
}
