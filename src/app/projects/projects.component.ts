import { Component, OnInit } from '@angular/core';
import {ServupService} from '../services/servup.service';
import { LOCALE_ID } from '@angular/core';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  requests: any[];
  editmode = false;
  constructor(private serveUpService: ServupService) { }

  ngOnInit() {
    this.serveUpService.getAllRequests().subscribe(
      result => {
        this.requests = result.requests;
      });
  }
  deletedReq(request){
    this.requests = this.requests.filter(req => req !== request);
  }
}
