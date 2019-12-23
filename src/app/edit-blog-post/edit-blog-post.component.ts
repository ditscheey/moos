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
  public tags; public ta;
  public placeholder;
  public data;
  public routeInfo;
  public img_name;
  public img; public invert; public font;
  public post;
  public img_index;
  public img_url = this.apiUrl + 'api/blog/image';
  public tag;
  public raw;

  public own_imgs;
  public color_add;
  public name;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    route.params.subscribe(params => {
      this.routeInfo = params.id;
      console.log(this.routeInfo);
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

  public updatePost() {
   // console.log(this.img);
    this.tag = this.getTagFromColor();
    if (this.own_imgs) {
      this.img = this.own_imgs[this.img_index];
    } else {
      this.getImgs();
      this.img = this.own_imgs[this.img_index];
    }
    //this.isInvert();
    let post = {
      'title': this.title,
      'tags': this.tag,
      'img_id': this.img._id,
      'img_url': this.img.path,
      'content': this.content,
      'font': this.font
    };
    this.setImgClass();
    console.log(post);
    this.http.put(this.apiUrl + 'api/posts/' + this.post._id, post).subscribe(err => {
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
      this.ta = this.tags[0];
    console.log(this.tags);
    });
    console.log("tags should be finished");
  }
  public getImgs(){
    this.http.get(this.apiUrl + 'api/imgs').subscribe(data => {
      this.own_imgs = data;
    });
  }

  public getPosts() {
    this.http.get(this.apiUrl + 'api/posts').subscribe(data => {
      this.raw = data;
       let temp = this.raw.filter(x => x._id === this.routeInfo);
      this.post = temp[0];
      this.title = this.post.form.title;
     // this.tags = this.post.form.tag;
      this.font = this.post.form.font;
      this.content = this.post.form.content;
    });
  }

  public isInvert() {
    if (!this.invert) {
      this.font = 'white';
      this.invert = true;
    } else {
      this.font = 'black';
      this.invert = false;
    }
    console.log(this.font);
  }


  ngOnInit() {
    this.getPosts();
    this.getTags();
    this.getImgs();
  }
}




