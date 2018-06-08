import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { environment} from '../..//environments/environment';
import * as moment from 'moment';
import { OrderPipe } from 'ngx-order-pipe';
import index from '@angular/cli/lib/cli';

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

  public order = 'time';
  public reverse = false;
  public filter_input = null;
  public filter = {'form' : {
      'title' : '',
      'tags' : '',
    }};

  constructor(private route: ActivatedRoute, private http: HttpClient , private router: Router, private orderPipe: OrderPipe) {
    console.log(this.orderPipe.transform(this.data, this.order));
}


  ngOnInit() {
    this.getPosts();
    console.log(this.orderPipe.transform(this.data, this.order));
  }

  public convertBadge(index) {
    let temp_tag = this.tags[index];
   // console.log(temp_tag.color.split('-')[1]);
    let style = 'badge-' + temp_tag.color.split('-')[1];
    //console.log(style);
    return style;
  }


  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  setFilter(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
      console.log("reverse   " + this.reverse);
    }
    this.order = value;
  }

  public getPosts() {
    this.http.get(this.apiUrl + 'api/posts').subscribe(data => {
      this.data = data;
        this.data.forEach((post, i) => {
           /*console.log(post);
          console.log(index); */
           let temp = post.time;
           let days = moment().diff(temp, 'days');
           let hours= moment().diff(temp, 'hours');
           let mins = moment().diff(temp, 'minutes');

          console.log(days);
        });
    });
    this.http.get(this.apiUrl + 'api/tags').subscribe(data => {
        this.tags = data;
      });
    }
  }

