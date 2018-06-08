import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment} from '../../../environments/environment';
@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
  // Declare Variables
  public apiUrl = environment.apiUrl;
  public info1;
  public info2;
  public markt;
  public nachbarschaft1;
  public nachbarschaft2;
  public data;
  public gallery;
  lat = 47.66332;
  lng = 11.20835;

  // Constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.getInfo();
  }

  ngOnInit() {
    this.getInfo();
  }
getInfo () {
    this.http.get(this.apiUrl + 'api/info').subscribe( data =>   {
     // this.info1 = data.info1;
      this.data = data[1];
      this.info1 = this.data.info1;
      this.info2 = this.data.info2;
      this.markt = this.data.markt;
      this.nachbarschaft1 = this.data.nachbarschaft1;
      this.nachbarschaft2 = this.data.nachbarschaft2;

    });
}
}
