import { Component, OnInit } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';

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
  constructor(private router: Router) { }
  showImage (index){
    this.router.navigate(['/image/', index]);
  }
  ngOnInit() {
  }

}
