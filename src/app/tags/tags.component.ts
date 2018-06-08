import { Component, OnInit } from '@angular/core';
import {HttpModule} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  public name;
  public color_add;
  public apiUrl = environment.apiUrl;
  public font_color;
  public color;
  public tag_upd_name;
  color_upd;
  public tags_upd ;



  constructor(private http: HttpClient, private router: Router) { }



  ngOnInit() {
    this.getTags();
  }


public updateTag() {
 let temp = this.getTagFromColorUpd();
  if (this.color === null) {
    this.color = temp.color;
  }
  let tag = {
    'name' : this.name,
    'color': this.color
  };


  this.http.put(this.apiUrl + 'api/tags/' + temp._id, tag).subscribe(err => {
    if (err) {
      console.log(err);
    }

    for (let i of this.tags_upd) {
      if (i._id === temp._id) {
        i.name = this.name;
        i.color = this.color;
      }
    }
    this.router.navigate(['./admin']);
  });
}



  public filterColors() {
      for (let tag of this.tags_upd) {
        switch (tag.color) {
          case 'bg-primary': {
            return false;
          }
          case 'bg-secondary': {
            return false;
          }
          case 'bg-info': {
            return false;
          }
          case 'bg-white': {
            return false;
          }
          case 'bg-danger': {
            return false;
          }
          case 'bg-dark': {
            return false;
          }
          case 'bg-light': {
            return false;
          }
        }
      }

  }
  public getTagFromColorUpd() {
    for (let tag of this.tags_upd) {
      console.log(tag);
      if (tag.color === this.color) {
        console.log(tag);
        return tag;
      }
      console.log("no tag found ");
    }
  }

  public getTags() {
    this.http.get(this.apiUrl + 'api/tags').subscribe(data => {
      this.tags_upd = data;
    });
  }


  public addTag() {
    let tag = {
      'name' : this.name,
      'color': this.color
    };
    this.http.post(this.apiUrl + 'api/tags', tag).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.router.navigate(['./admin']);
    });
  }
}
