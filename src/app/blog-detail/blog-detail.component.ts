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
  public routeInfo;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router, public auth: AuthService) {
    route.params.subscribe(params => {
      this.routeInfo = params.id;

    });
    this.getPosts();
  }

  ngOnInit() {
    //this.getCms();
  }

  public getPosts() {
    this.http.get(this.apiUrl + 'api/posts').subscribe(data => {
      this.post = data[this.routeInfo];

      console.log(data);
    });
  }

  public updatePost(index) {
    console.log("update");
    this.router.navigate(['./blog/post/edit/' + index]);
  }

  public deletePost() {
    console.log(this.post._id);
    this.http.delete(this.apiUrl + 'api/post/' + this.post._id).subscribe(data => {
      this.router.navigate(['./blog/']);
    });
  }
}


