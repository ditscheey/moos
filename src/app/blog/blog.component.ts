import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { environment} from '../..//environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public data;
  public title;
  public details;
  public tags;
  public apiUrl = environment.apiUrl;

  constructor(private route: ActivatedRoute, private http: HttpClient , private router: Router) { }


  ngOnInit() {
    this.getPosts();

  }
  public getPosts(){
    this.http.get(this.apiUrl + 'api/posts').subscribe(data => {
      this.data = data;

    });
  }
  }
