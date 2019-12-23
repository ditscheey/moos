import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import {
  CalendarEvent,
  CalendarViewPeriod,
  DAYS_OF_WEEK,
  CalendarDateFormatter,
  CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent,
  CalendarMonthViewDay
} from 'angular-calendar';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();
  public locale = 'de';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];
  view: string = 'month';
  public apiUrl = environment.apiUrl;
  public bookings;
  public ownDates = [];
  public ownBookings;
  public book;
  public ownBookings_flag = true;
  public bookings_flag = true;

  events: CalendarEvent[] = [];
  events_free: CalendarEvent[] = [];
  period: CalendarViewPeriod;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getOwnBookings();
    //this.getBookings();
  }

  public limitMonthsback(){
    var viewD = moment(this.viewDate);
    //console.log("viewD" + viewD.month());
    var today = moment().subtract(1, 'months');
    //console.log(today.month());
    if (viewD.month() === today.month()) {
      return false;
    } else { return true;}
  }
  beforeMonthViewRender({body}: { body: CalendarMonthViewDay[] }): void {
    //let done = this.free_events();
    body.forEach(day => {
      if (day.isToday && day.inMonth) {
        day.cssClass = 'today';
      }
      if (!day.events.length && day.inMonth) {
        day.cssClass = 'free';
      }
      if (day.events.length && day.inMonth) {
        day.cssClass = 'reserved';
      }
    });
  }
  public getOwnBookings() {
    this.http.get(this.apiUrl + 'api/fewo').subscribe(data => {
      this.ownBookings = data;
      this.createEventsOwn();
    });
  }

  public getBookings() {
    this.http.get(this.apiUrl + 'api/fewo').subscribe(data => {
      this.bookings = data;
      //console.log(this.bookings);
      this.createEvents();
    });
  }

  public createEventsOwn() {
    //console.log("size");console.log(this.ownBookings.length)
    this.ownBookings.forEach(booking => {
      //console.log(moment(booking));
      let ev = {
        'start': moment(booking).toDate(),
        'end': moment(booking).toDate(),
        'title': 'belegt', 'cssClass': 'odd-cell'
      };     //console.log('Events own');
      this.events.push(ev);
      /*
      for (let i = 1; i < 31; i++) {
        let today = moment().subtract(i,'days');
        let ev_t = {
          'start': today.toDate(),
          'end': today.toDate(),
          'title': 'belegt | reserved', 'cssClass': 'odd-cell'};
        this.events.push(ev_t);
      }
      */
    });

    //console.log(this.events);
  }
  public createEvents() {
    if (this.bookings) {
      this.bookings.forEach(booking => {
        let ev = {
          'start': moment(booking.start).add(1, 'days').toDate(),
          'end': moment(booking.end).subtract(1, 'days').toDate(),
          'title': 'belegt | reserved', 'cssClass': 'odd-cell'};
        if (moment(ev.start).isAfter(moment(ev.end)))
        {
          //console.log('alternativ');
          let ev = {
            'start': moment(booking.start).toDate(),
            'end': moment(booking.end).subtract(2, 'days').toDate(),
            'title': 'alternativ', 'cssClass': 'odd-cell'};
          this.events.push(ev);
        }
        this.events.push(ev);
      });
    }
   // deactive all days after today
    for (let i = 1; i < 31; i++) {
      let today = moment().subtract(i,'days');
      let ev_t = {
        'start': today.toDate(),
        'end': today.toDate(),
        'title': 'belegt | reserved', 'cssClass': 'odd-cell'};
      this.events.push(ev_t);
    }
  }

  public refresh() {
      window.location.reload();
  }

}



