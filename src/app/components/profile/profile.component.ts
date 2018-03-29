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

  ngAfterViewInit() {
    this.fullAboutText = $('#abouttext').text();

    const text = this.truncString(this.fullAboutText, 447, '...');
    $('#abouttext').text(text);
  }

  truncString(str, max, add) {
    add = add || '...';
    return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
  }

  showAllText(event) {
    if (this.isFullText) {
      $(event.target).text('Toon meer');
      const text = this.truncString(this.fullAboutText, 447, '...');
      $('#abouttext').text(text);
      this.isFullText = false;
    } else {
      $(event.target).text('Toon minder');
      $('#abouttext').text(this.fullAboutText);
      this.isFullText = true;
    }
  }
  showAllQAndA(event){
    if(this.qAndAIsFull){
      $(event.target).text('Toon meer');
      this.qAndAIsFull = false;
    }else{
      $(event.target).text('Toon minder');
      this.qAndAIsFull = true;
    }
  }
}
