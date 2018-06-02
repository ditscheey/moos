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
  public img_url = this.apiUrl + 'api/blog/image';
  public post;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    route.params.subscribe(params => {
      this.routeInfo = params.id;
    });

  }



  public updatePost(){

    let data = {
      'title' : this.title,
      'tags' : this.tags,
      'img_name': this.img_name,
      'content' : this.content
    };
    this.http.put(this.apiUrl + 'api/post/' + this.post._id, data).subscribe(next => {
      this.router.navigate(['./blog']);
    } );
  }

  public getPosts() {
    this.http.get(this.apiUrl + 'api/posts').subscribe(data => {
      this.post = data[this.routeInfo];
      this.title = this.post.title;
      this.tags = this.post.tags;
      this.img_name = this.post.img_name;
      this.content = this.post.content;
    });
  }
  ngOnInit() {
    // Create Form set Validation
    /*this.postForm = this.fb.group({
      'title': [, Validators.required],
      'tags': [, Validators.required]
    }); */
    this.getPosts();
  }

}



