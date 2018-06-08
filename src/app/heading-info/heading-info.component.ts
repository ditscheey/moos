import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heading-info',
  templateUrl: './heading-info.component.html',
  styleUrls: ['./heading-info.component.css']
})
export class HeadingInfoComponent implements OnInit {
  public apiUrl = environment.apiUrl;
  public raw;
  public h1; public h2; public h3; public h4; public h5;
  public success = false;
  public gear;
  public gears = [];
  public icon;
  fallbackIcon = 'fa fa-book';
  public newIcon;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getHeadings();
  }

  public addGear() {
    // add value to array save array in first doc cms
    this.gears.push(this.gear);
    this.updateHeadings();
  }

  public deleteGear(index) {
    this.gears.splice(index, 1);
    this.updateHeadings();
  }

  public onIconPickerSelect(newIcon) {
    console.log(newIcon);
  }
  public getHeadings() {
    this.http.get(this.apiUrl + 'api/info').subscribe(data => {
      this.raw = data[0];
      this.h1 = this.raw.h1;
      this.h2 = this.raw.h2;
      this.h3 = this.raw.h3;
      this.h4 = this.raw.h4;
      this.h5 = this.raw.h5;
      this.gears = this.raw.gears;
      console.log(this.raw);
    });
  }

  public updateHeadings() {
    let headings = {
      'id' : this.raw._id,
      'h1' : this.h1,
      'h2' : this.h2,
      'h3' : this.h3,
      'h4' : this.h4,
      'h5' : this.h5,
      'gears': this.gears
    };
    this.http.put(this.apiUrl + 'api/cms/headings', headings).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.router.navigate(['/info']);
    });

  }

}
