import { Component, OnInit } from '@angular/core';
import {HttpModule} from '@angular/http';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {forEach} from '@angular/router/src/utils/collection';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent implements OnInit {
  public apiUrl = environment.apiUrl;
  public data;
  public pickerOptions: any;
  public bookings;
  public ownDates = [];
  public ownBookings;
  public  date = moment();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getBookings();
    this.getOwnBookings();
  }

  public getOwnBookings(){
    this.http.get(this.apiUrl + 'api/bookings').subscribe(data => {
      this.ownBookings = data;
      this.ownBookings.forEach(booking => {
        let start_date = moment(booking.form.dateFrom, 'DD.MM.YYYY');
        this.ownDates.push(booking.form.dateFrom);
        for (let d = 0; d < booking.nights; d ++) {
          start_date.add(1, 'days');
          this.ownDates.push(start_date.format('DD.MM.YYYY'));
          }
      });
      //console.log(this.ownDates);
    });
  }

  public deleteBooking(index){
    console.log("delete " + index);

    this.http.delete(this.apiUrl + 'api/bookings/' + this.ownBookings[index]._id).subscribe( data =>   {
      this.ownBookings.splice(index, 1);
    });
  }
public checkDate(date) {
    for (let ownDate of this.ownDates) {
      if (date.format('DD.MM.YYYY') === ownDate){ return true; }
    }
}
  public getBookings() {
    this.http.get(this.apiUrl + 'api/file').subscribe(data => {
      //console.log(data);
      if (!this.ownBookings) { this.getOwnBookings(); }
      this.bookings = data;
      //   console.log(this.bookings);
      this.pickerOptions = {
        showDropdowns: true,
        showWeekNumbers: true,
        timePickerIncrement: 5,
        autoApply: true,
        minDate: this.date,
        alwaysShowCalendars: true,
        drops: 'down',
        isInvalidDate: date => {
          for (var ii = 0; ii < this.ownDates.length; ii++) {
            //console.log("date " + date.format('DD.MM.YYYY'));
            if (date.format('DD.MM.YYYY') === this.ownDates[ii]) {
              return true;
            }
          }
          for (var jj = 0; jj < this.bookings.length; jj++) {
            if (date.format('DD.MM.YYYY') === this.bookings[jj]) {
              return true;
            }
          }
        }
      };
    });
  }

}
