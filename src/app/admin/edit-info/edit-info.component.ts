import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment} from '../../../environments/environment';
@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
  // Declare Variables
  public apiUrl = environment.apiUrl;
  public info1;
  public info2;
  public markt;
  public nachbarschaft1;
  public nachbarschaft2;
  public data;
  public gallery;
  public headings;
  public gears;
  lat = 47.66332;
  lng = 11.20835;
  public preis1;  public preis2;  public preis3;  public preis4; public preis5;

  // Constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.getInfo();
  }

  ngOnInit() {
    this.getInfo();
    this.getGears();
  }

  public getGears() {
    this.http.get(this.apiUrl + 'api/gears').subscribe(gears => {
      this.gears = gears;
      console.log(this.gears.length);
      //console.log(this.gears);
    });
  }

  getInfo () {
    this.http.get(this.apiUrl + 'api/info').subscribe( data =>   {
      // this.info1 = data.info1;
      if ( data[0].info1 ) {
        this.data = data[0];
        this.headings = data[1];
      } else {
        this.data = data[1];
        this.headings = data[0];
      }
      this.info1 = this.data.info1;
      this.info2 = this.data.info2;
      this.markt = this.data.markt;
      this.nachbarschaft1 = this.data.nachbarschaft1;
      this.nachbarschaft2 = this.data.nachbarschaft2;
      this.preis1 = this.headings.preis1;
      this.preis2 = this.headings.preis2;
      this.preis3 = this.headings.preis3;
      this.preis4 = this.headings.preis4;
      this.preis5 = this.headings.preis5;
    });
  }
}
