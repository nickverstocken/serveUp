import {Component, OnInit, ViewChild, AfterViewInit, HostListener, NgZone} from '@angular/core';
import { CalendarComponent as FullcalendarComp } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {take} from 'rxjs/operators/take';
import 'rxjs/add/operator/distinctUntilChanged';
import {AuthService} from '../../services/auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit, AfterViewInit {
  date = new Date();
  view = 'month';
  height;
  calendarOptions: Options;
  data = [
    {
      "title": "All Day Event",
      "start": "2018-03-01"
    },
    {
      "title": "Long Event",
      "start": "2018-03-07",
      "end": "2018-03-10"
    },
    {
      "id": "999",
      "title": "Repeating Event",
      "start": "2018-03-09T16:00:00-05:00"
    },
    {
      "id": "999",
      "title": "Repeating Event",
      "start": "2018-03-16T16:00:00-05:00"
    },
    {
      "title": "Conference",
      "start": "2018-03-11",
      "end": "2018-03-13"
    },
    {
      "title": "Meeting",
      "start": "2018-03-12T10:30:00-05:00",
      "end": "2018-03-12T12:30:00-05:00"
    },
    {
      "title": "Lunch",
      "start": "2018-03-12T12:00:00-05:00"
    },
    {
      "title": "Meeting",
      "start": "2018-03-12T14:30:00-05:00"
    },
    {
      "title": "Happy Hour",
      "start": "2018-03-12T17:30:00-05:00"
    },
    {
      "title": "Dinner",
      "start": "2018-03-12T20:00:00"
    },
    {
      "title": "Birthday Party",
      "start": "2018-03-13T07:00:00-05:00"
    },
    {
      "title": "Click for Google",
      "url": "http://google.com/",
      "start": "2018-03-28"
    }
  ];
  user;
  queryPararms = { date: '', view: ''};
  openLeft = false;
  @ViewChild('ucCalendar') ucCalendar: FullcalendarComp;
  constructor(private router: Router, private datePipe: DatePipe, private route: ActivatedRoute, private authService: AuthService) { }
  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: true,
      selectable: true,
      locale: 'nl-be',
      height: 'parent',
      timeFormat: 'HH:mm',
      nowIndicator: true,
      header: {
        left: 'month,agendaWeek,agendaDay, listMonth',
        center: 'title',
        right: 'prev,next'
      },
      eventAfterAllRender: (view) => {
      },
      events: this.data
    };
    this.authService.currentUser.subscribe(result => {
      this.user = result;
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.height =  document.querySelector('#calendar').clientHeight + 20;
    this.calendarOptions.height = this.height;

  }
  ngAfterViewInit(){
    this.route.queryParams.subscribe(params => {
      if(params.date){
        const date = new Date(params.date.split('-')[2], params.date.split('-')[1] - 1, params.date.split('-')[0]);
        this.date = date;
      }
      if(params.view){
        this.view = params.view;
      }
      this.queryPararms.date = this.datePipe.transform(this.date, 'dd-MM-yyyy');
      this.queryPararms.view = this.view;
    });
  }
  calenderLoaded(event){
    this.ucCalendar.fullCalendar('gotoDate',  this.date);
    this.ucCalendar.fullCalendar('changeView', this.view);
  }
  eventClick(event){

  }
  updateEvent(event){

  }
  dateSelected(event){
    console.log(event);
  }
  clickButton(event){
    if(event.buttonType === 'next' || event.buttonType === 'prev'){
      const date = new Date(event.data._i[0], event.data._i[1], event.data._i[2]);
      this.queryPararms.date = this.datePipe.transform(date, 'dd-MM-yyyy');
      this.date = date;
    }
    //agendaWeek, month, listMonth, agendaDay
    if(event.buttonType === 'agendaWeek' || event.buttonType === 'month' || event.buttonType === 'listMonth' || event.buttonType === 'agendaDay'){
      this.queryPararms.view = event.buttonType;
    }
    this.router.navigate(['/calendar'], { queryParams: this.queryPararms});
  }
  onChange(event){
    const date = this.datePipe.transform(event, 'dd-MM-yyyy');
    this.queryPararms.date = date;
    if(!this.queryPararms.view){
      this.queryPararms.view = this.ucCalendar.fullCalendar('getView').name;
    }
    this.ucCalendar.fullCalendar('changeView', this.queryPararms.view);
    this.ucCalendar.fullCalendar('gotoDate', event);
    this.router.navigate(['/calendar'], { queryParams: this.queryPararms});
  }
}
