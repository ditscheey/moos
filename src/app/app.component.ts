import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Studio Murnauer Moos';
  constructor( public auth: AuthService, public router: Router) {
    auth.handleAuthentication();
  }
  public login(){
    this.auth.login();
  }

  public scroll(id ) {
    //console.log(id);
    let el = document.getElementById(id);
    el.scrollIntoView();
  }


}
