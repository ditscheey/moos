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
  public raw; public font = 'black';
  public headings; public invert = true;
  public h1; public h2; public h3; public h4; public h5;
  public preise ; public preis_neu; public color; public update; public content;
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
    this.getPreise();
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
      //this.preise = this.headings.preis1;
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
    };
    this.http.put(this.apiUrl + 'api/cms/headings', headings).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.router.navigate(['/info']);
    });
    //this.router.navigate(['/info']);
  }

  public getPreise() {
    this.http.get(this.apiUrl + 'api/preise').subscribe(data => {
      this.preise = data;
    });
  }

  public addPreis(){
    let preis = {
      'content' : this.content,
      'color': this.color,
      'font': this.font
    };
    this.http.post(this.apiUrl + 'api/preise', preis).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.preise.push(preis);
      this.router.navigate(['./admin']);
    });
  }

  public updatePreis(id, index) {
    let preis = {
      'content' : this.content,
      'color': this.color,
      'font': this.font
    };
    this.http.put(this.apiUrl + 'api/preise/' + id, preis).subscribe(err => {
      if (err) {console.log(err); }
      this.preise[index] = preis;
    });
  }
  public setFlag (id, index) {
    this.update = {
      'id' : id,
      'index' : index
    };
    this.color = this.preise[index].color;
    this.content = this.preise[index].name;
    this.invert = this.preise[index].invert;
  }

  public deleteTag(id, index) {
    this.http.delete(this.apiUrl + 'api/preise/' + id).subscribe(err =>{
      if ( err) {console.log(err);}
      this.preise.splice(index, 1);
    });
  }

  public showUsed(tag_color) {
    if (tag_color === this.color) {
      return tag_color;
    } else { return false; }
  }

 public isInvert() {
    if (this.invert) {
      this.font = 'white';
      this.invert = false;
    } else {
      this.font = 'black';
      this.invert = true;
    }

  }


}
