import { Component, OnInit } from '@angular/core';
import {HttpModule} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  public name;
  public color_add;
  public apiUrl = environment.apiUrl;
  public font_color;
  public color;
  public tag_upd_name;
  color_upd;
  public tags_upd ;
  public update;

  public colors_used = [];
  public colors_options = ['bg-info', 'bg-primary', 'bg-secondary', 'bg-light' , 'bg-dark','bg-warning', 'bg-danger'];

  constructor(private http: HttpClient, private router: Router) { }



  ngOnInit() {
    this.getTags();
  }

public filterColor(color) {
  for ( const col of this.colors_options ) {
    if (color === col) {
      return false;
    } else {
      return true;
    }
  }

}


  public getTagFromColorUpd() {
    for (let tag of this.tags_upd) {
      console.log(tag);
      if (tag.color === this.color) {
        console.log(tag);
        return tag;
      }
      console.log("no tag found ");
    }
  }

  public showUsed(tag_color) {
    if (tag_color === this.color) {
      return tag_color;
    } else { return false; }
  }
  public getTags() {
    this.http.get(this.apiUrl + 'api/tags').subscribe(data => {
      this.tags_upd = data;
    });
  }


  public addTag() {
    let tag = {
      'name' : this.name,
      'color': this.color
    };
    this.http.post(this.apiUrl + 'api/tags', tag).subscribe(err => {
      if (err) {
        console.log(err);
      }
      this.tags_upd.push(tag);
      this.router.navigate(['./admin']);
    });
  }

  public updateTag(id, index) {
    let tag = {
      'name' : this.name,
      'color': this.color
    };
    this.http.put(this.apiUrl + 'api/tags/' + id, tag).subscribe(err => {
      if (err) {console.log(err);}
        this.tags_upd[index] = tag;
    });
  }


  public setFlag (id, index) {
      this.update = {
        'id' : id,
        'index' : index
      };
      this.color = this.tags_upd[index].color;
      this.name = this.tags_upd[index].name;
  }

  public deleteTag(id, index) {
    this.http.delete(this.apiUrl + 'api/tags/' + id).subscribe(err =>{
      if ( err) {console.log(err);}
      this.tags_upd.splice(index, 1);
      });
  }


}
