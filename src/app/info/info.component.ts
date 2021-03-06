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

  lat: number = 47.66332;
  lng: number = 11.20835;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }
  getInfo (){
    this.http.get(this.apiUrl + 'api/info').subscribe( data =>   {
      // this.info1 = data.info1;
      this.data = data;
      this.info1 = this.data.info1;
      this.info2 = this.data.info2;
      this.markt = this.data.markt;
      this.nachbarschaft1 = this.data.nachbarschaft1;
      this.nachbarschaft2 = this.data.nachbarschaft2;
    });
  }
  ngOnInit() {
    this.getInfo();
  }

}
