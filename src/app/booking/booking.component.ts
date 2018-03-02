import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment} from '../../environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  // Define Variables
  bookingForm: FormGroup;
  public pickerOptions: any;
  public bookings;
  public daterange: any = {};
  public  date = moment();
  public nights = 0;
  public price;
  public complete ;
  public flag = true;
  public flag2 = true;
  public priceNight;
public apiUrl = environment.apiUrl;

public preisInfo = 'Zu jeder Buchung kommen 30€ Reinigungsgebühr. Ab 3 Personen fallen zusätzlich 10€ pro Tag an. Für ein Haustier  5€ pro Tag. ' +
  'In der Nebensaison von 07.01 bis zum 31.03 kostet die Nacht nur 42€ .'+
  'Die Mittelsaison geht vom 31.03 bis zum 01.06 und kostet pro Nacht 44€';

  constructor(private fb: FormBuilder,
              private _elRef: ElementRef,
              private http: HttpClient,
              private router: Router) {
    // Function of Constructor
    this.bookings = this.getBookings();
    }
  public calendarCanceled(e: any) {
  //  console.log(e);
  }
  public calendarApplied(e: any) {
    this.bookingForm.get('dateFrom').patchValue(e.picker.startDate.format('DD.MM.YYYY'));
    this.bookingForm.get('dateTo').patchValue(e.picker.endDate.format('DD.MM.YYYY'));
    this.nights = moment(e.picker.endDate).diff(e.picker.startDate,'days',false);
 //   console.log('Nights: ' + this.nights);
    this.price = this.checkSaison(e.picker.startDate);
    this.priceNight = this.price;
    this.flag = true;   // reset flag when new dates picked
    this.flag2 = true;
    this.calcPrice();
  }

  calcPrice() {
    if (this.bookingForm.get('dateFrom').value || this.bookingForm.get('dateTo').value ) {
    if (this.bookingForm.get('people').value > 2) {
      if (this.flag) {
        this.price += 10;
        this.flag = false;
        this.flag2 = true;
      }
    }
    if ( this.bookingForm.get('people').value < 3) {
          if (this.flag2 && !this.flag) {
            this.price -= 10;
            this.flag = true;
            this.flag2 = false;
          }
    };

    this.complete =  this.price * Number(this.nights) + 30 + this.calcPets();
  }
  };

  public calcPets(){
    const pricePet = 5;
    if (this.bookingForm.get('pets').value  === '1') {
        return pricePet;
    }else if (this.bookingForm.get('pets').value === '2') {
      return 2 * pricePet;
    }else {
      return 0;
    }
  }

   checkSaison(selectedDate) {
     const  nebensaison  = ['01.07.' + this.date.year(), '03.31.' + this.date.year()];
     const  mittelsaison =  ['03.31.' + this.date.year(), '06.01.' + this.date.year()];;
     if (selectedDate.isBetween(moment(nebensaison[0]), moment(nebensaison[1]))) {
            return 42;
          } else if (selectedDate.isBetween(moment(mittelsaison[0]), moment(mittelsaison[1]))) {
            return 44;
          } else {
       return 54;
     }
   }

  dateSelected(value: any) {
    this.daterange.startDate = value.start;
    this.daterange.endDate = value.end;
  }

  addBooking() {
    var post_value = {
      'form' : this.bookingForm.value,
      'nights' : this.nights,
      'priceNight': this.priceNight,
      'price': this.complete,
    };
  //  console.log(post_value);
      this.http.post(this.apiUrl + 'api/bookings', post_value).subscribe(data =>{
      this.router.navigate(['./info']);
    }

    );
  }

  public getBookings() {
    this.http.get(this.apiUrl + 'api/file').subscribe(data => {
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
          for (var ii = 0; ii < this.bookings.length; ii++) {
            if (date.format('DD.MM.YYYY') === this.bookings[ii]) {
              return true;
            }
          }
        }
      };

    });
  }

  ngOnInit() {
    this.bookings = this.getBookings();
    // Create Form set Validation
    this.bookingForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.email],
      dateFrom: [, Validators.required],
      dateTo: [, Validators.required],
      people: [, Validators.required],
      pets:'',
      kids:'',
      comment: ''
    });
  }
}
