import { Component, OnInit } from '@angular/core';
import {ServupService} from '../services/servup.service';
import { LOCALE_ID } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PusherService} from '../services/pusher.service';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {ToastServiceService} from '../services/toast-service.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  requests: any[];
  editmode = false;
  chatSub;
  receivedMsg;
  user: User;
  constructor(private snackbar: ToastServiceService, private serveUpService: ServupService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(result => {
      this.user = result;
      if (result.id) {
        this.serveUpService.getAllRequests().subscribe(
          result => {
            this.requests = result.requests;
          },(error) => {
            this.snackbar.sendNotification('Er is iets misgelopen!');
          });
      }else{
        this.auth.populate();
      }
    });

  }
  deletedReq(request){
    this.requests = this.requests.filter(req => req !== request);
    this.snackbar.sendNotification('Verzoek succesvol verwijderd!');
  }
}
