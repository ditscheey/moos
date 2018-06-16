import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageService} from '../image.service';

@Component({
  selector: 'app-gallery-board',
  templateUrl: './gallery-board.component.html',
  styleUrls: ['./gallery-board.component.css']
})
export class GalleryBoardComponent implements OnInit {
  public name;
  public desc;
  public path;
  constructor(private imgService: ImageService) { }

  ngOnInit() {

  }
  public updateItemGallery() {
    let img = {
      'name' : this.name,
      'desc' : this.desc,
      'path': this.path
    };
  }
}
