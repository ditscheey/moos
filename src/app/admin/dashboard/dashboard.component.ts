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
  public h1; public h2; public h3; public h4; public h5;

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

  public getHeadings() {
    this.http.get(this.apiUrl + 'api/info').subscribe(data => {
      this.raw = data[0];
      this.h1 = this.raw.h1;
      this.h2 = this.raw.h2;
      this.h3 = this.raw.h3;
      this.h4 = this.raw.h4;
      this.h5 = this.raw.h5;
;
    });
  }

  public updateHeadings() {
    const headings = {
      'id' : this.raw._id,
      'h1' : this.h1,
      'h2' : this.h2,
      'h3' : this.h3,
      'h4' : this.h4,
      'h5' : this.h5,
    };
    this.http.put(this.apiUrl + 'api/cms/headings', headings).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.router.navigate(['/info']);
    });
  }



}
