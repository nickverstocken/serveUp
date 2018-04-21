import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Chatmessage} from '../../models/Chatmessage';
import {Service} from '../../models/Service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  @Input() messages: Chatmessage[];
  @Input() receiver: User;
  @Output() messageSend: EventEmitter<any> = new EventEmitter<any>();
  user: User;
  chatmessage: Chatmessage;
  textArea;
  messagesElement;
  private messagesSubject = new BehaviorSubject<any>([]);
  private messagesObservable = this.messagesSubject.asObservable();
  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.messagesSubject.next(this.messages);
    this.messagesObservable.subscribe((messages) => {
      console.log(messages);
    });
    this.auth.currentUser.subscribe(
      (userData) => {
        this.user = userData;
        this.clearChatMessage();
      });
  }
  ngAfterViewInit(){
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
    this.chatmessage.updated_at = new Date().toLocaleString();
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
}
