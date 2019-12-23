import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryBoardComponent } from './gallery-board.component';

describe('GalleryBoardComponent', () => {
  let component: GalleryBoardComponent;
  let fixture: ComponentFixture<GalleryBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
