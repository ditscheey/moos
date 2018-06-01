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

  blogForm: FormGroup;
  public content;
  public placeholder;
  public data;
  public routeInfo;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    route.params.subscribe(params => {
      console.log(params);
      this.routeInfo = params.detail;

    });
    console.log(this.apiUrl + 'blog/image');
  }

  public blogPost(){
    let data = {
      'title' : this.blogForm.get('title').value,
      'tags' : this.blogForm.get('tags').value,
      'content' : this.content
    };
    this.http.post(this.apiUrl + 'api/post', data).subscribe(next => {
      this.router.navigate(['blog']);
    } );


  }


  ngOnInit() {
    // Create Form set Validation
    this.blogForm = this.fb.group({
      title: [, Validators.required],
      content: [, Validators.required],
      tags: [, Validators.required]
    });
  }

}



