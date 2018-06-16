import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  public apiUrl = environment.apiUrl;
  public post;
  public posts;
  public routeInfo;
  public own_imgs;
  public font_color;
  public header;
  public url;
  public ident;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router, public auth: AuthService) {
    route.params.subscribe(params => {
      this.routeInfo = params.id;
      this.url = 'http://studiomurnauermoos.de/blog/post/#!newthread';
    });
    this.getPosts();
  }

  ngOnInit() {
    //this.getCms();
    this.getPosts();
  }

  get getImageUrl() {
    if (this.post) {
      console.log(`url("${this.post.form.img_url}")`);
      return `url("${this.post.form.img_url}")`;
    }

    return null;
  }


  public getPosts() {
    this.http.get(this.apiUrl + 'api/posts').subscribe(data => {
      this.posts = data;
     var temp = this.posts.filter(x => x._id === this.routeInfo);
       this.post = temp[0];
       this.font_color = 'text-' + this.post.form.tags.color.split('-')[1];
      console.log(this.post);

    });

  }

  public updatePost(index) {
    this.router.navigate(['./blog/post/edit/' + index]);
  }

  public deletePost() {
    this.http.delete(this.apiUrl + 'api/post/' + this.post._id).subscribe(data => {
      this.router.navigate(['./blog/']);
    });
  }

  public isInvert2(bool) {
    if (bool) {
      return 'white';
    } else {
      return 'black';
    }
  }

}


