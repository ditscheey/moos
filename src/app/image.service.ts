import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable()
export class ImageService {
  public imgs;
  public gallery;
  public apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {
    this.getImgs();
    this.getGallery();
  }

  public getImgs () {
      if (this.imgs) {
        return this.imgs;
      } else {
        this.http.get(this.apiUrl + 'api/imgs').subscribe(data => {
          this.imgs = data;
          // console.log(this.imgs);
          return this.imgs;
        });
      }
  }

  public deleteImg(index) {
    let temp = this.imgs[index];
    this.http.delete(this.apiUrl + 'api/imgs/' + temp._id).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.imgs.splice(index, 1);
    });
  }

  public getGallery() {
     this.http.get(this.apiUrl + 'api/gallery').subscribe(data => {
   this.gallery = data;
 });
  }

  public deleteItemGallery(index) {
    let temp = this.imgs[index];
    this.http.delete(this.apiUrl + 'api/gallery/' + temp._id).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.gallery.splice(index, 1);
    });
  }

  public addItemGallery(img) {

    this.http.post(this.apiUrl + 'api/gallery/' , img).subscribe(err => {
      if (err) {console.log(err); }
      //this.gallery.push(img);
    });
  }

  public updateItemGallery(img, index) {

    this.http.put(this.apiUrl + 'api/gallery/' + img.id, img).subscribe(err => {
      if (err) {console.log(err); }
      this.gallery[index] = img;
    });
  }



}
