import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.css']
})
export class ImpressumComponent implements OnInit {
  public details = false;
  constructor() { }

  ngOnInit() {
  }

  public toogle() {
    if (this.details) {
      this.details = false;
    } else {
      this.details = true;
    }
  }
}
