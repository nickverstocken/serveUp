import {Component, OnInit, ViewChild, AfterViewInit, HostListener, NgZone, ElementRef} from '@angular/core';
import {CalendarComponent as FullcalendarComp} from 'ng-fullcalendar';
import {EventObject, Options} from 'fullcalendar';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {take} from 'rxjs/operators/take';
import 'rxjs/add/operator/distinctUntilChanged';
import {AuthService} from '../../services/auth.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ServupService} from '../../services/servup.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit, AfterViewInit {
  date = new Date();
  viewStartDate;
  viewEndDate;
  view = 'month';
  height;
  calendarOptions: Options;
  visibleCalenders = ['personal'];
  events;
  user;
  queryPararms = {date: '', view: ''};
  openLeft = false;
  checked = [];
  @ViewChild('ucCalendar') ucCalendar: FullcalendarComp;

  constructor(private router: Router, private datePipe: DatePipe, private route: ActivatedRoute, private authService: AuthService, private serveUpService: ServupService) {
  }

  ngOnInit() {
    this.calendarOptions = {
      editable: false,
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
      }
    };
    this.authService.currentUser.subscribe(result => {
      this.user = result;
    /*  this.serveUpService.getAppointments()*/
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.height = document.querySelector('#calendar').clientHeight + 20;
    this.calendarOptions.height = this.height;

  }
  eventRender(eventObj){
    let displayEvent = false;
    eventObj.event.source.className.forEach((className) => {
        if(this.checked.indexOf(className) !== -1){
          displayEvent = true;
        }
    });
    return displayEvent;
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      if (params.date) {
        const date = new Date(params.date.split('-')[2], params.date.split('-')[1] - 1, params.date.split('-')[0]);
        this.date = date;
      }
      if (params.view) {
        this.view = params.view;
      }
      this.queryPararms.date = this.datePipe.transform(this.date, 'dd-MM-yyyy');
      this.queryPararms.view = this.view;
    });
  }

  loadEvents() {

  }

  calenderLoaded(event) {
    this.ucCalendar.fullCalendar('gotoDate', this.date);
    this.ucCalendar.fullCalendar('changeView', this.view);
    this.setEvents();
  }
  setEvents(){
    this.viewStartDate = this.datePipe.transform(new Date(this.ucCalendar.fullCalendar('getView').start._i), 'yyyy-MM-dd');
    this.viewEndDate = this.datePipe.transform(new Date(this.ucCalendar.fullCalendar('getView').end._i), 'yyyy-MM-dd');
    this.serveUpService.getAppointments( this.viewStartDate, this.viewEndDate).subscribe(data => {
      this.events = data.appointments;
      Object.keys(this.events).forEach((calendar, index) => {
        this.ucCalendar.fullCalendar('removeEventSource', calendar);
        this.ucCalendar.fullCalendar('addEventSource', {events: this.events[calendar], id: calendar, className: 'cat' + calendar});
      });
    });
  }
  eventClick(event) {
    console.log(event);
  }

  updateEvent(event) {

  }

  dateSelected(event) {
    console.log(event);
  }

  clickButton(event) {
    if (event.buttonType === 'next' || event.buttonType === 'prev') {
      const date = new Date(event.data._i[0], event.data._i[1], event.data._i[2]);
      this.queryPararms.date = this.datePipe.transform(date, 'dd-MM-yyyy');
      this.date = date;
    }
    //agendaWeek, month, listMonth, agendaDay
    if (event.buttonType === 'agendaWeek' || event.buttonType === 'month' || event.buttonType === 'listMonth' || event.buttonType === 'agendaDay') {
      this.queryPararms.view = event.buttonType;
    }
    this.setEvents();
    this.router.navigate(['/calendar'], {queryParams: this.queryPararms});
  }

  onChange(event) {
    const date = this.datePipe.transform(event, 'dd-MM-yyyy');
    this.queryPararms.date = date;
    if (!this.queryPararms.view) {
      this.queryPararms.view = this.ucCalendar.fullCalendar('getView').name;
    }
    this.ucCalendar.fullCalendar('changeView', this.queryPararms.view);
    this.ucCalendar.fullCalendar('gotoDate', event);
    this.router.navigate(['/calendar'], {queryParams: this.queryPararms});
  }

  toggleEvents(event, id) {
    if (event.checked) {
      this.ucCalendar.fullCalendar('addEventSource', {events: this.events[id], id: id, className: 'cat' + id});
    } else {
      this.ucCalendar.fullCalendar('removeEventSource', id);
    }
  }
}
