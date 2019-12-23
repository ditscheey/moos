import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingInfoComponent } from './heading-info.component';

describe('HeadingInfoComponent', () => {
  let component: HeadingInfoComponent;
  let fixture: ComponentFixture<HeadingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
