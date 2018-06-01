import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesBlogComponent } from './images-blog.component';

describe('ImagesBlogComponent', () => {
  let component: ImagesBlogComponent;
  let fixture: ComponentFixture<ImagesBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
