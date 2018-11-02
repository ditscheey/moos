import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminGuardService implements CanActivate {
  public profile;

  constructor(private auth: AuthService, private router: Router) {
  }

  public checkProfile() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      //console.log("profile was there");
      //console.log(this.profile.name);
      return true;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        //console.log('profile had to be fetched');
        return true;
      });
    }
  }

  canActivate(): boolean {
   // this.checkProfile();
    //console.log(localStorage.getItem('name'));

    if (localStorage.getItem('name') === 'Susanne Meyer-Keusch') {
      return true;
    }
    //console.log("admin failed");
    this.router.navigate(['info']);
    return false;
  }
}
