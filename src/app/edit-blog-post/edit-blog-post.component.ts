import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.css']
})

export class EditBlogPostComponent implements OnInit {
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
  public post;
  public img_index;
  public img_url = this.apiUrl + 'api/blog/image';
  public tag;


  public own_imgs;
  public color_add;
  public name;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    route.params.subscribe(params => {
      this.routeInfo = params.id;
    });

  }

  public getTagFromColor() {
    for (let tag of this.tags) {
      if (tag.color === this.color_add) {
        console.log(tag);
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
      'title': this.post.form.title,
      'tags': this.post.form.title,
      'img_id': this.img._id,
      'img_url': this.img.path,
      'content': this.post.form.content,
      'time' : this.post.time
    };
    console.log(post);
    this.http.put(this.apiUrl + 'api/posts/' + this.post._id, post).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.router.navigate(['/blog']);
    });

  }

  public getTags() {
    this.http.get(this.apiUrl + 'api/tags').subscribe(data => {
      this.tags = data;
    });
  }

  public getImgs() {
    this.http.get(this.apiUrl + 'api/imgs').subscribe(data => {
      this.own_imgs = data;
    });
  }

  public getPosts() {
    this.http.get(this.apiUrl + 'api/posts').subscribe(data => {
      this.post = data[this.routeInfo];
    });
  }

  public getUrl(){
    if (this.img_index) {
      let temp = this.own_imgs[this.img_index];
      return temp.path;
    } else {
      return null;
    }
  }
  ngOnInit() {
    this.getPosts();
    this.getTags();
    this.getImgs();
  }
}




