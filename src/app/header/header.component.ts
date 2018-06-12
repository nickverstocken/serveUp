import {Component, OnInit, HostListener, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../models/User';
import {environment} from '../../environments/environment.prod';
import {ServupService} from '../services/servup.service';
import {PusherService} from '../services/pusher.service';
import {Chatmessage} from '../models/Chatmessage';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user: User;
  authenticated;
  showSubnav = 'hideSubnav';
  showNoti = 'hideNoti';
  innerWidth;
  mobile = false;
  mobileMenu = '';
  notifications;
  unreadnoti = 0;
  selectedService = -1;
  NOTIFICATION_TYPES = {
    request: 'App\\Notifications\\NewOffer',
    action: 'App\\Notifications\\OfferAction'
  };
  sub;
  pushersub;
  currentUserSub;
  services = [];
  showMessages = false;
  messageCount;
  messages: Chatmessage[];
  constructor(private router: Router, private route:ActivatedRoute, private auth: AuthService, private servupService: ServupService, private pusherService: PusherService) {
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.hideAll();
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    }
    this.auth.currentUser.subscribe(
      userData => {
        if(userData.id){
          this.user = userData;
          this.authenticated = true;
          Object.assign(this.services, this.user.service);
          this.pushersub = this.pusherService.notificationsChannel.bind('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', result => {
            this.notifications.push(result);
            this.unreadnoti += 1;
          });
          this.servupService.getNotifications().subscribe(
            result => {
              this.notifications = result.notifications;
              this.unreadnoti = result.unread;
            }
          );
        }
      }
    );
    this.servupService.serviceAddedSubj.subscribe(result => {
      if(result){
        this.services.push(result);
        this.servupService.serviceAddedSubj.next(null);
      }

    });
    this.auth.isAuthenticated.subscribe(
      data => {
        this.authenticated = data;
      });

  }
  ngAfterViewInit() {
    this.sub = this.servupService.selectedService.subscribe(result => {
      this.selectedService = result;
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  logout(){
    this.pushersub.unsubscribe();
    this.auth.logout();
    this.services = [];
    this.showSubnav = 'hideSubnav';
    this.mobileMenu = '';
  }
  srollToTop(){
    $('html,body').animate({ scrollTop: 0 }, 'fast');
    $('#email').focus();
  }
  openMobileMenu(){
    if(this.mobileMenu === 'opened'){
      this.mobileMenu = '';
    }else{
      this.mobileMenu = 'opened';
    }
  }
  toggleSubNav(){
    if(this.showSubnav === 'hideSubnav'){
       this.showSubnav = '';
    }else{
      this.showSubnav ='hideSubnav';
      $('.chooseContainer').slideUp({'duration': 200});
      $('.fa-caret-down').removeClass('rotate');
    }
  }
  toggleNoti(){
    if(this.showNoti === 'hideNoti'){
      this.showNoti = '';
    }else{
      this.showNoti = 'hideNoti';
    }
  }

  makeNotiRoute(notification){
    let to = '?read=' + notification.id;
    if(notification.type === this.NOTIFICATION_TYPES.request) {
      to = 'inbox';
    }
    if(notification.type === this.NOTIFICATION_TYPES.action){
      if(notification.data.action === 'accepted'){
        to = 'project/' + notification.data.request_id + '/offer/' + notification.data.offer_id;
      }
      if(notification.data.action === 'declined'){
        to = 'projects';
      }
      if(notification.data.action === 'hired'){
        to = 'inbox?filter=hired';
      }
    }
    return '/' + to;
  }
  markasReadAndRedirect(noti){
    const route = this.makeNotiRoute(noti);
    this.servupService.markAsRead(noti.id).subscribe(result => {
      this.notifications = result.notifications;
      this.unreadnoti = result.unread;
      this.router.navigate([route]);
    });
  }
  toggleMessages(){
    this.showMessages = !this.showMessages;
  }
  hideAll(){
    this.showNoti = 'hideNoti';
    this.showSubnav = 'hideSubnav';
  }
}
