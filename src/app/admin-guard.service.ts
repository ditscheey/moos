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
      return true;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        return true;
      });
    }
  }

  canActivate(): boolean {
   this.checkProfile();
    if (this.profile === 'Susanne Meyer-Keusch') {
      return true;
    }
    this.router.navigate(['info']);
    return false;
  }
}
