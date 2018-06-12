import { Component, OnInit } from '@angular/core';
import {ServupService} from '../services/servup.service';
import { LOCALE_ID } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PusherService} from '../services/pusher.service';
import {User} from '../models/User';
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
  constructor(private serveUpService: ServupService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(result => {
      this.user = result;
      if (result.id) {
        this.serveUpService.getAllRequests().subscribe(
          result => {
            this.requests = result.requests;
          });
      }
    });

  }
  deletedReq(request){
    this.requests = this.requests.filter(req => req !== request);
  }
}
