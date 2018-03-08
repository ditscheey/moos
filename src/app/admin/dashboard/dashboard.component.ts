import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../auth.service';
import {logging} from 'selenium-webdriver';
import {changeTime} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
profile: any;

  constructor(private auth: AuthService) { }

  public checkProfile () {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log("profile was there");
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log('profile had to be fetched');
        console.log('profile');
      });
    }
  }

  ngOnInit() {
    console.log("heck profile");
    this.checkProfile();
  }

}
