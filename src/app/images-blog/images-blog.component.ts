import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpModule} from '@angular/http';
import { environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-images-blog',
  templateUrl: './images-blog.component.html',
  styleUrls: ['./images-blog.component.css']
})
export class ImagesBlogComponent implements OnInit {
public apiUrl = environment.apiUrl;

  constructor(private router: Router, private http: HttpClient) { }
  public imgs;

  ngOnInit() {
  }
public copyUrl (index){

  //this.router.navigate(['/image/', index]);
}

public getImgs(){
    this.http.get(this.apiUrl +'api/imgs').subscribe(imgs =>{
      this.imgs = imgs;
    })
}
}
