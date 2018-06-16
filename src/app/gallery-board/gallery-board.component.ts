import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageService} from '../image.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-gallery-board',
  templateUrl: './gallery-board.component.html',
  styleUrls: ['./gallery-board.component.css']
})
export class GalleryBoardComponent implements OnInit {
  public title;
  public position;
  public img_path;
  public imgs; public gallery; public update; public preview;
  public apiUrl = environment.apiUrl;

  constructor(private imgService: ImageService, private http:HttpClient) { }

  ngOnInit() {
    this.getGallery();
  }
  public updateItemGallery(id, index) {
    let img = {
      'title' : this.title,
      'position' : this.position,
      'img_path': this.img_path
    };
    this.http.put(this.apiUrl + 'api/gallery/' + id, img).subscribe(err => {
      if ( err ) {console.log(err); }
      this.gallery[index] = img;
    });
  }

  public setPreview(img) {
    this.preview = img.img_path;
    img.active = true;
  }
  public addImg() {
    let img = {
      'title' : this.title,
      'position' : this.position,
      'img_path': this.img_path,
    };
    console.log(img.img_path);
    this.gallery.push(img);
    this.imgService.addItemGallery(img);
  }

  public getGallery() {
    this.http.get(this.apiUrl + 'api/gallery').subscribe(data => {
      this.gallery = data;
      console.log(this.gallery);
    });
  }


  public setFlag (id, index) {
    this.update = {
      'id' : id,
      'index' : index
    };
    this.position = this.gallery[index].position;
    this.img_path = this.gallery[index].img_path;
    this.title = this.gallery[index].title;
  }

  public deleteItemGallery(id, index) {
    this.http.delete(this.apiUrl + 'api/gallery/' + id).subscribe(err =>{
      if ( err) {console.log(err);}
      this.gallery.splice(index, 1);
    });
  }

}
