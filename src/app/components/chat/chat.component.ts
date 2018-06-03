import {
  Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectorRef, ViewChild, ElementRef,
  AfterViewInit
} from '@angular/core';
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
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  @Input() messages: Chatmessage[];
  @Input() receiver: User;
  @Input() offerId;
  @Input() loading = true;
  @Input() disabled = false;
  @Output() messageSend: EventEmitter<any> = new EventEmitter<any>();
  @Output() appointmentSend: EventEmitter<any> = new EventEmitter<any>();
  @Output() priceofferSend: EventEmitter<any> = new EventEmitter<any>();
  @Output() appointmentAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() priceOfferAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() messageEditted: EventEmitter<any> = new EventEmitter<any>();
  @Output() messageReceived: EventEmitter<any> = new EventEmitter<any>();
  user: User;
  chatmessage: Chatmessage;
  textArea;
  showemojis = false;
  chatSub;
  showAppointmentPopup = false;
  showPriceOfferPopup = false;
  showFileUploaderPopup = false;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private auth: AuthService, private pusherService: PusherService, private datePipe: DatePipe, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.textArea = document.querySelector('#textarea');
    this.auth.currentUser.subscribe(
      (userData) => {
        this.user = userData;
        this.clearChatMessage();
        this.chatSub = this.pusherService.chatChannel.bind('App\\Events\\MessageSent', result => {
          this.messageReceived.emit(result);
          if (result.sender.id === this.receiver.id) {
            this.messages.push(result);
          }
        });
        this.pusherService.chatChannel.bind('App\\Events\\MessageEditted', result => {
          if (result.action === 'edit') {
            this.messageEditted.emit(result.message);
          }

        });
      });

    this.cdRef.detectChanges();
  }

  clearChatMessage() {
    this.chatmessage = new Chatmessage();
    this.chatmessage.id = -1;
    this.chatmessage.sender_id = this.user.id;
    this.chatmessage.sender = this.user;
    this.chatmessage.receiver_id = this.receiver.id;
    this.chatmessage.receiver = this.receiver;
    this.chatmessage.message_id = this.offerId;
    this.chatmessage.created_at = new Date().toLocaleString();
    this.chatmessage.updated_at = null;
  }

  keyupfunction(e) {
    this.autoGrow(e);
    if (e.keyCode === 13 && !e.shiftKey) {
      if (this.chatmessage.message.trim()) {
        this.messages.push(this.chatmessage);
        this.messageSend.emit({'chatmessage': this.chatmessage, 'index': this.messages.indexOf(this.chatmessage)});
        this.clearChatMessage();
      }

    }
  }

  scrollToBottom(): void {
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
  }

  autoGrow(e) {
    this.textArea.style.height = '42px';
    if (this.textArea.scrollHeight < 101) {
      this.textArea.style.overflow = 'hidden';
    } else {
      this.textArea.style.overflow = 'auto';
    }
    this.textArea.scrollTop = this.textArea.scrollHeight;
    this.textArea.style.height = (this.textArea.scrollHeight) + 'px';
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
    }
  }

  showEmojis() {
    if (this.showemojis) {
      this.showemojis = false;
    } else {
      this.showemojis = true;
    }
  }

  sendAppointMent(frmData) {
    const appointment = new Appointment();
    appointment.title = frmData.controls.title.value;
    appointment.date = this.datePipe.transform(frmData.controls.date.value, 'yyyy-MM-dd');
    appointment.time = frmData.controls.time.value;
    appointment.location = frmData.controls.location.value;
    appointment.creator_id = this.user.id;
    appointment.receiver_id = this.receiver.id;
    appointment.approved = false;
    this.chatmessage.type = 'date';
    this.chatmessage.message = JSON.stringify(appointment);
    this.messages.push(this.chatmessage);
    console.log(this.chatmessage);
    this.appointmentSend.emit({'appointment': appointment, 'index': this.messages.indexOf(this.chatmessage)});
    this.showAppointmentPopup = false;
    this.clearChatMessage();
  }

  sendPriceOffer(frmData) {
    const priceOffer = frmData.value;
    priceOffer.approved = false;
    priceOffer['cancelled'] = false;
    priceOffer.creator_id = this.user.id;
    priceOffer.receiver_id = this.receiver.id;
    this.chatmessage.type = 'price';
    this.chatmessage.message = JSON.stringify(priceOffer);
    this.messages.push(this.chatmessage);
    this.priceofferSend.emit({'priceoffer': priceOffer, 'index': this.messages.indexOf(this.chatmessage)});
    this.showPriceOfferPopup = false;
    this.clearChatMessage();
  }

  cancelAppointment(message) {
    this.appointmentAction.emit({'action': 'canceled', message});
  }

  cancelOwnAppointment(message) {
    this.appointmentAction.emit({'action': 'cancelOwn', message});
  }

  acceptAppointment(message) {
    this.appointmentAction.emit({'action': 'approved', message});
  }

  cancelPriceOffer(message) {

    this.priceOfferAction.emit({'action': 'canceled', message});
  }

  cancelOwnPriceOffer(message) {
    this.priceOfferAction.emit({'action': 'cancelOwn', message});
  }

  acceptPriceOffer(message) {
    this.priceOfferAction.emit({'action': 'approved', message});
  }

  showPopover(type) {
    this.showAppointmentPopup = false;
    this.showPriceOfferPopup = false;
    this['show' + type + 'Popup'] = true;
  }
}
