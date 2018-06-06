import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOwnComponent } from './image-own.component';

describe('ImageOwnComponent', () => {
  let component: ImageOwnComponent;
  let fixture: ComponentFixture<ImageOwnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageOwnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
