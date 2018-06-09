import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  public apiUrl = environment.apiUrl;
  public info1;
  public info2;
  public markt;
  public nachbarschaft1;
  public nachbarschaft2;
  public data;
  public gallery;
  public headings;

  public gear_counter;
  public gears;
  lat: number = 47.66332;
  lng: number = 11.20835;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  getInfo () {
    this.http.get(this.apiUrl + 'api/info').subscribe( data =>   {
      // this.info1 = data.info1;
      this.data = data[1];
      this.info1 = this.data.info1;
      this.info2 = this.data.info2;
      this.markt = this.data.markt;
      this.nachbarschaft1 = this.data.nachbarschaft1;
      this.nachbarschaft2 = this.data.nachbarschaft2;

      this.headings = data[0];
    });
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

  public checkIndex(index){

    var temp = index / 3;
    console.log(temp);
    if (Number.isInteger(temp) ){
      return true;
    }
  }

}
