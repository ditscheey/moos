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

  constructor(private http: HttpClient, private router: Router) { }



  ngOnInit() {
  }



  public addTag() {
    let tag = {
      'name' : this.name,
      'color': this.color,
      'font_color': this.font_color
    };
    this.http.post(this.apiUrl + 'api/tags', tag).subscribe(err => {
      if (err) {
        console.log(err);
      }

    });
  }
}
