import { Component, OnInit, Input } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-day-select',
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.scss']
})
export class DaySelectComponent implements OnInit {
  @Input() daysSelected = {'days': ['ma']};
  constructor() { }
  daysOfWeek = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'];
  timeoptions =  [
    {
      value: '07:00',
      name: '07:00'
    },
    {
      value: '07:30',
      name: '07:30'
    },
    {
      value: '08:00',
      name: '08:00'
    },
    {
      value: '08:30',
      name: '08:30'
    },
    {
      value: '09:00',
      name: '09:00'
    },
    {
      value: '09:30',
      name: '09:30'
    },
    {
      value: '10:00',
      name: '10:00'
    },
    {
      value: '10:30',
      name: '10:30'
    },
    {
      value: '11:00',
      name: '11:00'
    },
    {
      value: '11:30',
      name: '11:30'
    },
    {
      value: '12:00',
      name: '12:00'
    },
    {
      value: '12:30',
      name: '12:30'
    },
    {
      value: '13:00',
      name: '13:00'
    },
    {
      value: '13:30',
      name: '13:30'
    },
    {
      value: '14:00',
      name: '14:00'
    },
    {
      value: '14:30',
      name: '14:30'
    },
    {
      value: '15:00',
      name: '15:00'
    },
    {
      value: '15:30',
      name: '15:30'
    },
    {
      value: '16:00',
      name: '16:00'
    },
    {
      value: '16:30',
      name: '16:30'
    },
    {
      value: '17:00',
      name: '17:00'
    },
    {
      value: '17:30',
      name: '17:30'
    },
    {
      value: '18:00',
      name: '18:00'
    },
    {
      value: '18:30',
      name: '18:30'
    },
    {
      value: '19:00',
      name: '19:00'
    },
    {
      value: '19:30',
      name: '19:30'
    },
    {
      value: '20:00',
      name: '20:00'
    },
    {
      value: '20:30',
      name: '20:30'
    },
    {
      value: '21:00',
      name: '21:00'
    },
    {
      value: '21:30',
      name: '21:30'
    },
    {
      value: '22:00',
      name: '22:00'
    },
    {
      value: '22:30',
      name: '22:30'
    },
    {
      value: '23:00',
      name: '23:00'
    },
    {
      value: '23:30',
      name: '23:30'
    },
    {
      value: '00:30',
      name: '00:30'
    },
    {
      value: '01:00',
      name: '01:00'
    },
    {
      value: '01:30',
      name: '01:30'
    },
    {
      value: '02:00',
      name: '02:00'
    },
    {
      value: '02:30',
      name: '02:30'
    },
    {
      value: '03:00',
      name: '03:00'
    },
    {
      value: '03:30',
      name: '03:30'
    },
    {
      value: '04:00',
      name: '04:00'
    },
    {
      value: '04:30',
      name: '04:30'
    },
    {
      value: '05:00',
      name: '05:00'
    },
    {
      value: '05:30',
      name: '05:30'
    },
    {
      value: '06:00',
      name: '06:00'
    },
    {
      value: '06:30',
      name: '06:30'
    }
  ]
  ngOnInit() {
  }
  addOrRemoveDay(day){
    if(this.daysSelected.days.includes(day)){
      this.daysSelected.days = this.daysSelected.days.filter(d => d !== day);
    }else{
      this.daysSelected.days.push(day);
    }
  }
}
