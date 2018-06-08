import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.css']
})
export class PostBlogComponent implements OnInit {

  public apiUrl = environment.apiUrl;

  editorConfig = {
    'editable': true,
    'spellcheck': true,
    'height': '400',
    'minHeight': '720',
    'width': 'auto',
    'minWidth': '0',
    'translate': 'yes',
    'enableToolbar': true,
    'showToolbar': true,
    'placeholder': 'Enter text here...',
    'imageEndPoint': this.apiUrl + 'api/blog/image/',
    'toolbar': [
      ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
      ['fontSize', 'color'],
      ['indent', 'outdent'],
      ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
      ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
      ['link', 'unlink', 'image'],
      ['code']
    ]
  };

  //postForm: FormGroup;
  public content;
  public title;
  public tags;
  public placeholder;
  public data;
  public routeInfo;
  public img_name;
  public img;
  public img_index;
  public img_url = this.apiUrl + 'api/blog/image';
  public tag;

  public endpoint = this.apiUrl + 'api/imgs';
  public own_imgs;
  public color_add;
  public name;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    route.params.subscribe(params => {
      this.routeInfo = params.detail;
    });

  }

  public getTagFromColor() {
    for (let tag of this.tags) {
      if (tag.color === this.color_add) {
        return tag;
      }
      console.log("no tag found ");
    }
  }

  public addPost() {
    console.log(this.img);
    this.tag = this.getTagFromColor();
    if (this.own_imgs) {
      this.img = this.own_imgs[this.img_index];
    } else {
      this.getImgs();
      this.img = this.own_imgs[this.img_index];
    }
    let post = {
      'title': this.title,
      'tags': this.tag,
      'img_id': this.img._id,
      'img_url': this.img.path,
      'content': this.content
    };
    this.setImgClass();
    console.log(post);
    this.http.post(this.apiUrl + 'api/posts', post).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.router.navigate(['/blog']);
    });

  }

  public setImgClass() {
    let re = /<img /gi;
    this.content = this.content.replace(re,'<img class="img-fluid" ');
  }

  public getTags() {
    this.http.get(this.apiUrl + 'api/tags').subscribe(data => {
      this.tags = data;

    });
  }
  public getImgs(){
    this.http.get(this.apiUrl + 'api/imgs').subscribe(data => {
      this.own_imgs = data;
    });
  }

  ngOnInit() {
    this.getTags();
    this.getImgs();
  }
}



