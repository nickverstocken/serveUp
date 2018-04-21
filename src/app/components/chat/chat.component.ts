import {Component, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatmessage = '';
  textArea;
  messages;
  chatmessages = {

  }
  constructor() {
  }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.textArea = document.getElementById('textarea');
    this.messages = document.getElementById('messages');
    this.messages.scrollTop = this.messages.scrollHeight;
  }
  keyupfunction(e) {
    this.autoGrow();
    const code = (e.keyCode ? e.keyCode : e.which);

    if (code === 13) { //Enter keycode
      e.preventDefault();
    }
    if (e.which === 13 && e.shiftKey) {
      console.log('new line');
    }
  }

  autoGrow() {

      this.textArea.style.height = '42px';
    if (this.textArea.scrollHeight < 101) {
      this.textArea.style.overflow = 'hidden';
    } else {
      this.textArea.style.overflow = 'auto';
    }
    this.messages.scrollTop = this.messages.scrollHeight;
    this.textArea.scrollTop = this.textArea.scrollHeight;
    this.textArea.style.height = (this.textArea.scrollHeight) + 'px';
  }
}
