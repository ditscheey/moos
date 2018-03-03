import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Daterangepicker  } from 'ng2-daterangepicker';
import {NgxEditorModule} from 'ngx-editor';
import {HttpClient} from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { InfoComponent } from './info/info.component';
import { BookingComponent } from './booking/booking.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import {AgmCoreModule} from '@agm/core';
import { ImageComponent } from './image/image.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EditInfoComponent } from './admin/edit-info/edit-info.component';
import { EditAboutComponent } from './admin/edit-about/edit-about.component';
import { AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import { LoginComponent } from './login/login.component' ;


const appRoutes: Routes = [
  { path: '', redirectTo: 'info' , pathMatch: 'full'},
  {  path: 'info', component: InfoComponent },
  {  path: 'home', redirectTo: 'admin', pathMatch: 'full' },
  {  path: 'gallery', component: GalleryComponent },
  {  path: 'booking', component: BookingComponent },
  {  path: 'about', component: AboutComponent },
  { path: 'image/:id', component: ImageComponent},
  { path: 'admin', component: DashboardComponent , canActivate: [AuthGuardService]},
  { path: 'admin/editInfo', component: EditInfoComponent},
  { path: 'admin/editInfo/:detail', component: EditAboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'callback', redirectTo: 'admin'}

];
@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    BookingComponent,
    AboutComponent,
    GalleryComponent,
    ImageComponent,
    DashboardComponent,
    EditInfoComponent,
    EditAboutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
   NgxEditorModule,
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
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
