import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import {
  CalendarEvent,
  CalendarViewPeriod,
  CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent,
  CalendarMonthViewDay
} from 'angular-calendar';
import * as moment from 'moment';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date();

  view: string = 'month';
  public apiUrl = environment.apiUrl;
  public bookings;
  public ownDates = [];
  public ownBookings;

  //public  date = moment();
  public book;

  public ownBookings_flag = true;
  public bookings_flag = true;

  events: CalendarEvent[] = [];


  period: CalendarViewPeriod;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.getBookings();
    //this.getOwnBookings();

  }

  beforeMonthViewRender({body}: { body: CalendarMonthViewDay[] }): void {

    body.forEach(day => {
      if (day.events.length && day.inMonth) {
        day.cssClass = 'odd-cell';
        console.log(day.events.length);
      }
    });
  }

  public getOwnBookings() {
    this.http.get(this.apiUrl + 'api/bookings').subscribe(data => {
      this.ownBookings = data;
      this.ownBookings.forEach(booking => {
        let start_date = moment(booking.form.dateFrom, 'DD.MM.YYYY');
        //this.ownDates.push(booking.form.dateFrom);
        for (let d = 1; d < booking.nights; d++) {
          start_date.add(1, 'days');
          this.ownDates.push(start_date.format('DD.MM.YYYY'));
        }
      });
      //console.log(this.ownDates);
      //this.createEvents();
    });
  }

  public getBookings() {
    this.http.get(this.apiUrl + 'api/fewo').subscribe(data => {
      this.bookings = data;
      //console.log(this.bookings)
      this.createEvents();
    });
  }

  public createEvents() {
    if (this.bookings) {
      this.bookings.forEach(booking => {
        let ev = {
          'start': moment(booking.start).toDate(),
          'end': moment(booking.end).subtract(2, 'd').toDate(),
          'title': 'belegt | reserved', 'cssClass': 'odd-cell'};
        this.events.push(ev);
      });
    }

  }

  public updateCalendar(){
    console.log("send request to putty server --> download new boookings file");
  }
}



