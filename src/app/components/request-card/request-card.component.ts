import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServupService} from '../../services/servup.service';
import {PusherService} from '../../services/pusher.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit, AfterViewInit {
  @Input() request;
  @Output() onDeleted: EventEmitter<any> = new EventEmitter<any>();
  @Input() sender: User;
  editmode = false;
  chatSub;
  receivedMsg;
  constructor(private servupService: ServupService, private pusherService: PusherService) { }

  ngOnInit() {

  }
  ngAfterViewInit(){
    this.chatSub = this.pusherService.chatChannel.bind('App\\Events\\MessageSent', result => {
      console.log(result);
      this.receivedMsg = result;
      if(result.message_type === 'App\\Offer' && result.receiver.id === this.sender.id){
        const offer = this.request.offers.filter(item => item.id === result.message_id)[0];
        if(offer){
          offer.new_messages += 1;
        }

      }
    });
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
