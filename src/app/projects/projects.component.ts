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
  constructor(private serveUpService: ServupService) { }

  ngOnInit() {
    this.serveUpService.getAllRequests().subscribe(
      result => {
        console.log(result);
        this.requests = result.requests;
      });
  }

}
