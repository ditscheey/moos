import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {GearService} from '../gear.service';

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
  public gears ;
  public icon;
  public position;
  fallbackIcon = 'fa fa-book';
  public newIcon;

  public gears_input;
  public update;
  //myForm: FormGroup;
  //public iconCss = new FormControl();


  constructor(private http: HttpClient, private router: Router, private gearService: GearService) {

  }

  ngOnInit() {
    //this.myForm = new FormGroup({iconCss: this.iconCss});
    this.getHeadings();
    this.getGears();
  }

  public addGear() {
    // add value to array save array in first doc cms
    let ge = {
      'name' : this.gear,
      'icon' : this.newIcon,
    };
 // console.log(ge);
    this.http.post(this.apiUrl + 'api/gears', ge).subscribe(err => {
      if (err) {
        console.log(err);
      }
      if (!this.gears) {
        //console.log(this.gears);
      }
      this.gears.push(ge);
    });
  }

  public updateGear(id, index) {
    // add value to array save array in first doc cms
    const gear = {
      'name' : this.gear,
      'icon' : this.newIcon,
    };

    this.http.put(this.apiUrl + 'api/gears/' + id, gear).subscribe(err => {
      if (err) {
        //console.log(err);
      }
      this.gears[index] = gear;
      this.update = null;
      window.location.reload();
    });
  }

  public setFlag(id, index) {
    this.update = {
      'id' : id,
      'index': index
    };
    this.newIcon = this.gears[index].icon;
    this.gear = this.gears[index].name;
  }


  public getGears() {
    this.http.get(this.apiUrl + 'api/gears').subscribe(gears => {
      this.gears = gears;
      this.success = true;
      //console.log(this.gears);
    });
  }

  public deleteGear(id, index) {
      this.gearService.deleteGear(id);
      this.gears.splice(index, 1);
  }

  public onIconPickerSelect($event) {
    this.newIcon = $event;
    //this.iconCss.setValue($event);
  }
  public getHeadings() {
    this.http.get(this.apiUrl + 'api/info').subscribe(data => {
      this.raw = data[0];
      this.h1 = this.raw.h1;
      this.h2 = this.raw.h2;
      this.h3 = this.raw.h3;
      this.h4 = this.raw.h4;
      this.h5 = this.raw.h5;
    });
  }

  public updateHeadings() {
    const headings = {
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
      window.location.reload();
    });
  }




}
