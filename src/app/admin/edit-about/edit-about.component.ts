import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { environment} from '../../../environments/environment';


@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
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
    'imageEndPoint': '',
    'toolbar': [
      ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
      ['fontSize', 'color'],
      [ 'indent', 'outdent'],
      ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
      ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
      ['link', 'unlink', 'image'],
      ['code']
    ]
  };

  public  title= 'change: ';
  public content;
  public placeholder;
  public data;
  public routeInfo;
  public apiUrl = environment.apiUrl;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient , private router: Router) {
    route.params.subscribe(params => {
      console.log(params);
      this.routeInfo = params.detail;
     this.title += this.routeInfo;
    });
  }
   updateCms() {
    this.data[this.routeInfo] = this.content;
    // console.log(this.data);
    // push http
    this.http.put(this.apiUrl + 'api/cms', this.data).subscribe(data => {
      this.router.navigate(['']);
    } );
     this.router.navigate(['/admin/editInfo']);
  }

  public getCms() {
    this.http.get(this.apiUrl + 'api/info').subscribe(data => {
      this.data = data;
      this.content = data[this.routeInfo];
    });
  }


  ngOnInit() {
    this.getCms();

  }

}
