import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class GearService {
  public apiUrl = environment.apiUrl;
  public gears;
  constructor(private http: HttpClient) { }

  public getGears() {
    if (this.gears) {
      console.log(this.gears);
      return this.gears;
    } else {
      this.http.get(this.apiUrl + 'api/gears').subscribe(gears => {
        this.gears = gears;
        console.log("fetc");
        return gears;
      });
    }
  }

  public addGear(gear, newIcon, position) {
    // add value to array save array in first doc cms
    let ge = {
      'name' : gear,
      'icon' : newIcon,
      'position': position
    };
    console.log(ge);
    this.http.post(this.apiUrl + 'api/gears', ge).subscribe(err => {
      if (err) {
        console.log(err);
      }
      if (!this.gears) {
        console.log("no gears were ther");
      }
      this.gears.push(ge);
    });
  }


  public deleteGear(id) {
    this.http.delete(this.apiUrl + 'api/gears/' + id).subscribe(err => {
      if (err ) {
        console.log(err);
      }
      console.log("deltion complete");
    });
  }
}
