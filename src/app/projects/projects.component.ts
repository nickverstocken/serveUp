import {Component, HostListener, OnInit} from '@angular/core';
import {ServupService} from '../services/servup.service';
import { LOCALE_ID } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PusherService} from '../services/pusher.service';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {ToastServiceService} from '../services/toast-service.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  requests: any[];
  user: User;
  innerWidth;
  mobile = false;
  loading = true;
  constructor(private snackbar: ToastServiceService, private serveUpService: ServupService, private auth: AuthService, private location: Location) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
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
    this.auth.currentUser.subscribe(result => {
      this.user = result;
      if (result.id) {
        this.serveUpService.getAllRequests().subscribe(
          result2 => {
            this.requests = result2.requests;
          },(error) => {
            if(error.status !== 504){
              this.snackbar.sendNotification('Er is iets misgelopen!');
            }
            this.loading = false;
          },
          () => {
            this.loading = false;
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
  goBack(){
    this.location.back();
  }
}
