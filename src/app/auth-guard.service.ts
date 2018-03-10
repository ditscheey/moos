import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService} from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  public profile;
  constructor(private auth: AuthService, private router: Router) { }


  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      //console.log("Authguardservice passed");
      return true;
    }
    //console.log("authguard failed");
    return false;
  }
}
