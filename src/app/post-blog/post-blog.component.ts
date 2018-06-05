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
  public img_url = this.apiUrl + 'api/blog/image';
  public tag;

  public color_add;
  public name;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    route.params.subscribe(params => {
      this.routeInfo = params.detail;
    });

  }


  public setColor(){
    console.log(this.tag.color);
    this.color_add = this.tag.color;
  }

  public addPost(){

    let data = {
      'title' : this.title,
      'tags' : this.tag,
      'img_name': this.img_name,
      'content' : this.content
    };
    console.log(data);

    this.http.post(this.apiUrl + 'api/post', data).subscribe(next => {
      this.router.navigate(['blog']);
    } );
  }

  public getTags(){
    this.http.get(this.apiUrl + 'api/tags').subscribe(data => {
      this.tags = data;
      console.log(this.tags);
    });
  }

  ngOnInit() {
    this.getTags();
    // Create Form set Validation
    /*this.postForm = this.fb.group({
      'title': [, Validators.required],
      'tags': [, Validators.required]
    }); */
  }

}



