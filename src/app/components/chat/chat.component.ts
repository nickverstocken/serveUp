import {Component, OnInit, AfterViewChecked, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {Chatmessage} from '../../models/Chatmessage';
import {PusherService} from '../../services/pusher.service';
import {Appointment} from '../../models/Appointment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [DatePipe]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @Input() messages: Chatmessage[];
  @Input() receiver: User;
  @Output() messageSend: EventEmitter<any> = new EventEmitter<any>();
  @Output() appointmentSend: EventEmitter<any> = new EventEmitter<any>();
  user: User;
  chatmessage: Chatmessage;
  textArea;
  messagesElement;
  showemojis = false;
  chatSub;
  showAppointmentPopup = false;
  constructor(private auth: AuthService, private pusherService: PusherService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.auth.currentUser.subscribe(
      (userData) => {
        this.user = userData;
        this.clearChatMessage();
        this.chatSub = this.pusherService.chatChannel.bind('App\\Events\\MessageSent', result => {
          if(result.sender.id === this.receiver.id){
            this.messages.push(result);
          }
        });
      });
  }
  ngAfterViewChecked(){
    this.textArea = document.getElementById('textarea');
    this.messagesElement = document.getElementById('messages');
    this.scrollToBottom();
  }
  clearChatMessage(){
    this.chatmessage = new Chatmessage();
    this.chatmessage.id = -1;
    this.chatmessage.sender_id = this.user.id;
    this.chatmessage.sender = this.user;
    this.chatmessage.receiver_id = this.receiver.id;
    this.chatmessage.receiver = this.receiver;
    this.chatmessage.created_at = new Date().toLocaleString();
    this.chatmessage.updated_at = null;
  }
  keyupfunction(e) {
    this.autoGrow(e);
    if (e.keyCode === 13 && !e.shiftKey){
      if(this.chatmessage.message.trim()){
        this.messages.push(this.chatmessage);
        this.scrollToBottom();
        this.messageSend.emit({'chatmessage' : this.chatmessage, 'index' : this.messages.indexOf(this.chatmessage)});
        this.clearChatMessage();
      }

    }
  }
  scrollToBottom(){
    this.messagesElement.scrollTop = this.messagesElement.scrollHeight;
  }
  autoGrow(e) {
      this.textArea.style.height = '42px';
    if (this.textArea.scrollHeight < 101) {
      this.textArea.style.overflow = 'hidden';
    } else {
      this.textArea.style.overflow = 'auto';
    }
    this.scrollToBottom();
    this.textArea.scrollTop = this.textArea.scrollHeight;
    this.textArea.style.height = (this.textArea.scrollHeight) + 'px';
    if (e.keyCode === 13 && !e.shiftKey){
      e.preventDefault();
    }
  }
  showEmojis(){
    if(this.showemojis){
      this.showemojis = false;
    }else{
      this.showemojis = true;
    }
  }
  sendAppointMent(frmData){
    const appointment = new Appointment();
    appointment.title = frmData.controls.title.value;
    appointment.date =  this.datePipe.transform(frmData.controls.date.value, 'yyyy-MM-dd');
    appointment.time = frmData.controls.time.value;
    appointment.location = frmData.controls.location.value;
    appointment.creator_id = this.user.id;
    appointment.receiver_id = this.receiver.id;
    appointment.approved = false;
    this.appointmentSend.emit(appointment);
  }
}
