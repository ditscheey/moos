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
  public infoForm: FormGroup;
  public info1;
  public info2;
  public markt;
  public nachbarschaft;
  public nachbarschaft2;
  public gallerie;
  // Constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getInfo();
    this.infoForm = this.fb.group({
      info1: ''
       });
  }
getInfo (){
    this.http.get(this.apiUrl + 'api/info').subscribe( data =>   {
     // this.info1 = data.info1;
      console.log(data);
    });
}
}
