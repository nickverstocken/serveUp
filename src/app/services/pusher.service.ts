import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {AuthService} from './auth.service';
declare const Pusher: any;
@Injectable()
export class PusherService {
  pusher: any;
  userId;
  notificationsChannel;
  chatChannel;
  constructor(private auth: AuthService) {
    this.auth.currentUser.subscribe(result => {
      if(result.id){
        this.userId = result.id;
        this.pusher = new Pusher(environment.pusher.key, {
          cluster: 'eu',
          authEndpoint : environment.baseUrl + '/api/v1/pusher/auth',
          auth: {
            headers: {
              'Authorization': 'Bearer ' + this.auth.getToken()
            }
          }
        });
        this.notificationsChannel = this.pusher.subscribe('private-App.User.' + this.userId);
        this.chatChannel = this.pusher.subscribe('private-App.User.' + this.userId + '.chat');
      }
    });

  }

}
