import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../auth.service';
import {logging} from 'selenium-webdriver';
import {changeTime} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {GearService} from '../../gear.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
profile: any;
  public apiUrl = environment.apiUrl;
  public raw;
  public headings;
  public h1; public h2; public h3; public h4; public h5;
  public preise; public preis1; public preis2; public preis3; public preis4; public preis5;
  constructor(private auth: AuthService , private http: HttpClient, private router: Router) { }

  public checkProfile () {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      //console.log("profile was there");
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  ngOnInit() {
    this.checkProfile();
    this.getHeadings();
  }

  getHeadings () {
    this.http.get(this.apiUrl + 'api/info').subscribe( data =>   {
      // this.info1 = data.info1;
      if ( data[0].info1 ) {
        this.headings = data[1];
      } else {
        this.headings = data[0];
      }
      this.h1 = this.headings.h1;
      this.h2 = this.headings.h2;
      this.h3 = this.headings.h3;
      this.h4 = this.headings.h4;
      this.h5 = this.headings.h5;
      this.preis1 = this.headings.preis1;
      this.preis2 = this.headings.preis2;
      this.preis3 = this.headings.preis3;
      this.preis4 = this.headings.preis4;
      this.preis5 = this.headings.preis5;
    });
  }

  public updateHeadings() {
    const headings = {
      'id' : this.headings._id,
      'h1' : this.h1,
      'h2' : this.h2,
      'h3' : this.h3,
      'h4' : this.h4,
      'h5' : this.h5,
      'preis1': this.preis1,
      'preis2': this.preis2,
      'preis3': this.preis3,
      'preis4': this.preis4,
      'preis5': this.preis5
    };
    this.http.put(this.apiUrl + 'api/cms/headings', headings).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.router.navigate(['/info']);
    });
    //this.router.navigate(['/info']);
  }



}
