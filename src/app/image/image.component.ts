import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageService} from '../image.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
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
public img;
public gallery;
public apiUrl = environment.apiUrl;

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private modalService:  NgbModal, private imgService: ImageService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.image_id = params.id;
      this.getGallery();
      //this.image_path = 'http://159.89.19.33/assets/imgs/' + this.image_id + '.JPG';
      //this.image_desc = this.desc[this.image_id];

    }
    );

  }

  public getGallery() {
    this.http.get(this.apiUrl + 'api/gallery').subscribe(data => {
      this.gallery = data;
     // this.img = this.gallery.filter(x => x._id === this.image_id)[0];
      this.img = this.gallery[this.image_id];
    });
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

    if (toInteger(this.image_id) === this.gallery.length - 1) {
      this.router.navigate(['/image/', 0]);
    } else {
      this.temp = toInteger(this.image_id) + 1;
      this.router.navigate(['/image/', this.temp]);
    }
}
prevImg() {
    console.log(this.gallery.length);
  if (toInteger(this.image_id) === 0) {
    this.router.navigate(['/image/', (this.gallery.length - 1)]);
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
