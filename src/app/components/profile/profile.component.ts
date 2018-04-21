import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {User} from '../../models/User';
import {Service} from '../../models/Service';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  @Input() service: Service;
  fullAboutText;
  isFullText = false;
  qAndAIsFull = false;
  constructor() {
  }

  ngOnInit() {
  }

}
