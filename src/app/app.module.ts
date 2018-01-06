import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Daterangepicker  } from 'ng2-daterangepicker';

// Components
import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { BookingComponent } from './booking/booking.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import {AgmCoreModule} from '@agm/core';

const appRoutes: Routes = [
  { path: '', component: InfoComponent },
  {  path: 'info', component: InfoComponent },
  {  path: 'gallery', component: GalleryComponent },
  {  path: 'booking', component: BookingComponent },
  {  path: 'about', component: AboutComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    BookingComponent,
    AboutComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Daterangepicker,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsNMb4RG2O66JAEHYPLcw_RwAG6yzcuJQ'
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
