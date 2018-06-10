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
  public preview;
  public clipboard;
  public filter = {'name' : ''};
  //upload adress for post request
  public img_endpoint = this.apiUrl + 'api/imgs/';
  constructor(private http: HttpClient) { }

  public setPreview(index) {
    this.preview = this.own_imgs[index];
    //console.log(this.preview);
  }

  public deleteImg(index) {
    let temp = this.own_imgs[index];

    this.http.delete(this.apiUrl + 'api/imgs/' + temp._id).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.own_imgs.splice(index, 1);
      this.preview = null;
    });
  }

  public addImg($event) {
    console.log($event);
    this.getTags();
    this.getImgs();
  }

  public getTags() {
    this.http.get(this.apiUrl + 'api/tags').subscribe(data => {
      this.tags = data;
    });
  }

  public getImgs() {
    this.http.get(this.apiUrl + 'api/imgs').subscribe(data => {
      this.own_imgs = data;
    });
  }

  ngOnInit() {
    this.getTags();
    this.getImgs();
  }
}
