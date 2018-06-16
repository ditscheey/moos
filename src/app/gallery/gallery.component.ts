import { Component, OnInit } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {enterView} from '@angular/core/src/render3/instructions';
import {environment} from '../../environments/environment';
import {ImageService} from '../image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  imgs:any = [
    'http://159.89.19.33/assets/imgs/1.JPG',
    'http://159.89.19.33/assets/imgs/2.JPG' ,
    'http://159.89.19.33/assets/imgs/3.JPG' ,
    'http://159.89.19.33/assets/imgs/4.JPG' ,
    'http://159.89.19.33/assets/imgs/5.JPG' ,
    'http://159.89.19.33/assets/imgs/6.JPG' ,
    'http://159.89.19.33/assets/imgs/7.JPG',
    'http://159.89.19.33/assets/imgs/8.JPG' ,
    'http://159.89.19.33/assets/imgs/9.JPG' ,
    'http://159.89.19.33/assets/imgs/10.JPG' ,
    'http://159.89.19.33/assets/imgs/11.JPG' ,
    'http://159.89.19.33/assets/imgs/12.JPG'
  ];
  desc:any = [
    'Garten aus der Vogelperspektive',
    'Aussicht des Studios',
    'Aussicht der Terrasse',
    'Aufstieg zur Gallerie',
    'Essbereich',
    'Sitzecke',
    'Gallerie und Essbereich',
    'Schlafbereich',
    'Bad mit Dusche',
    'WC',
    'Aussicht im Winter',
    'Aussicht im Winter 2'
  ];
  public apiUrl = environment.apiUrl;
  public gallery;

  public own_imgs; public img;
  public preview;
  public clipboard;
  public filter = {'name' : ''};
  //upload adress for post request
  public img_endpoint = this.apiUrl + 'api/gallery/img';
  constructor(private router: Router, private http: HttpClient, private imgService: ImageService) {

  }
  showImage (id,index) {
    this.router.navigate(['/image/', index]);
  }
  ngOnInit() {
    this.getGallery();
  }

  public getGallery() {
    this.http.get(this.apiUrl + 'api/gallery').subscribe(gallery => {
      this. gallery = gallery;
    });
  }

  public setPreview(index) {
    this.preview = this.imgService.imgs[index];
    //console.log(this.preview);
  }

  public deleteImg(index) {
    //let temp = this.own_imgs[index];
    this.imgService.deleteImg(index);
    /*this.http.delete(this.apiUrl + 'api/imgs/' + temp._id).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.own_imgs.splice(index, 1);
          });*/
    this.preview = this.imgService.imgs[index-1];
  }




}
