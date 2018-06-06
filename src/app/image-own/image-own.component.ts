import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-image-own',
  templateUrl: './image-own.component.html',
  styleUrls: ['./image-own.component.css']
})
export class ImageOwnComponent implements OnInit {

  public apiUrl = environment.apiUrl;
  public tags;
  public own_imgs;

  // selected id --> to get preview and copy link
  public img_id;

  //upload adress for post request
  public img_endpoint = this.apiUrl + 'api/blog/image';
  constructor(private http: HttpClient) { }


  public getTags() {
    this.http.get(this.apiUrl + 'api/tags').subscribe(data => {
      this.tags = data;
    });
    this.http.get(this.apiUrl + 'api/imgs').subscribe(data => {
      this.own_imgs = data;
    });

  }

  ngOnInit() {
    this.getTags();
  }
}
