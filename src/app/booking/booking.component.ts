import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  public ownDates = [];
  public ownBookings;


public preisInfo;

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
  public getPreisInfo(){
    this.http.get(this.apiUrl + 'api/info').subscribe( data =>   {
      // this.info1 = data.info1;
      this.preisInfo = data['preisInfo'];
      });
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
    const post_value = {
      'form' : this.bookingForm.value,
    };
    //console.log(post_value);
      this.http.post(this.apiUrl + 'api/bookings', post_value).subscribe(data =>{
        window.location.reload();
    } );
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
    //  console.log('own');
    //  console.log(this.ownBookings);
    });
  }

  public getBookings() {
    this.http.get(this.apiUrl + 'api/file').subscribe(data => {
      this.bookings = data;
      if (!this.ownBookings) { this.getOwnBookings(); }
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

  ngOnInit() {
    this.bookings = this.getBookings();
    //this.getPreisInfo();
    // Create Form set Validation
    this.bookingForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*'), Validators.minLength(3)]],
      last_name: ['', [Validators.required,  Validators.pattern('^[a-zA-Z ]*') , Validators.minLength(3)]],
      dateFrom: [, [Validators.required, Validators.pattern('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$')]],
      dateTo: [,[Validators.required, Validators.pattern('^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$')]],
      comment: ''
    });
  }
}
