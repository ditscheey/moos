import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
public  image_path;
public image_id;
public image_desc;
public temp;

  desc: any = [
    'Garten aus der Vogelperspektive',
    'Aussicht des Studios',
    'Aussicht der Terrasse',
    'Aufstieg zur Gallerie',
    'Essbereich',
    'Sitzecke',
    'Gallerie und Essbereich',
    'Schlafbereich',
    'Bad mit Dusche',
    'WC',
    'Aussicht im Winter',
    'Aussicht im Winter 2'
  ];
  private pressedButton: string;
  closeResult: string;

  constructor(private route: ActivatedRoute, private router: Router, private modalService:  NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.image_id = toInteger(params.id);
      this.image_path = 'http://159.89.19.33/assets/imgs/' + this.image_id + '.JPG';
      this.image_desc = this.desc[this.image_id];
    //  this.open();
    }
    );

  }

  public open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

nextImg() {
    if (this.image_id === 12) {
      this.router.navigate(['/image/', 1]);
    } else {
      this.temp = toInteger(this.image_id) + 1;
      this.router.navigate(['/image/', this.temp]);
    }
}
prevImg() {

  if (this.image_id === 1) {
    this.router.navigate(['/image/', 12]);
  } else {
    this.temp = toInteger(this.image_id) - 1;
    this.router.navigate(['/image/', this.temp]);
  }
}
  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    event.stopPropagation();
    this.pressedButton = event.key;
    if (this.pressedButton === 'ArrowLeft') {
      this.prevImg();
    } else if (this.pressedButton === 'ArrowRight'){
      this.nextImg();
          }
  }
}
