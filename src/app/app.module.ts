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
import {MarkdownModule} from 'ngx-md';
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
// Services
import { AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import { LoginComponent } from './login/login.component' ;
import {StarRatingModule} from 'angular-star-rating';
import { ReviewsComponent } from './reviews/reviews.component';
import { CallbackComponent } from './callback/callback.component';
import {AdminGuardService} from './admin-guard.service';
import { BlogComponent } from './blog/blog.component';
import { PostBlogComponent } from './post-blog/post-blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ImagesBlogComponent } from './images-blog/images-blog.component';
import { AddBookingComponent } from './add-booking/add-booking.component';

import {ImageUploadModule} from 'angular2-image-upload';
import { EditBlogPostComponent } from './edit-blog-post/edit-blog-post.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { OrderModule } from 'ngx-order-pipe';
import { TagsComponent } from './tags/tags.component';
import { ImageOwnComponent } from './image-own/image-own.component';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {ClipboardModule} from 'ngx-clipboard';
import { HeadingInfoComponent } from './heading-info/heading-info.component';
import {IconPickerModule} from 'ngx-icon-picker';
import {DisqusModule} from 'ngx-disqus';
import {GearService} from './gear.service';
import {CalendarModule} from 'angular-calendar';
import { CalendarComponent } from './calendar/calendar.component';
import { GalleryBoardComponent } from './gallery-board/gallery-board.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'info' , pathMatch: 'full'},
  {  path: 'info', component: InfoComponent },
  {  path: 'home', redirectTo: 'admin', pathMatch: 'full' },
  {  path: 'gallery', component: GalleryComponent },
  {  path: 'booking', component: BookingComponent , canActivate: [AdminGuardService]},
  {  path: 'about', component: AboutComponent },
  { path: 'impressum', component: ImpressumComponent},
  { path: 'image/:id', component: ImageComponent},
  { path: 'admin', component: DashboardComponent , canActivate: [AdminGuardService]},
  { path: 'admin/editInfo', component: EditInfoComponent, canActivate: [AdminGuardService]},
  { path: 'admin/addBooking', component: AddBookingComponent, canActivate: [AdminGuardService]},
  { path: 'admin/editInfo/:detail', component: EditAboutComponent, canActivate: [AdminGuardService]},
  { path: 'tags', component: TagsComponent, canActivate: [AdminGuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'blog/post/:id', component: BlogDetailComponent},
  { path: 'blog/post/edit/:id', component: EditBlogPostComponent},
  { path: 'blog/post', component: PostBlogComponent},
  { path: 'callback', component: CallbackComponent },
  { path: 'calendar', component: CalendarComponent }

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
    LoginComponent,
    ReviewsComponent,
    CallbackComponent,
    BlogComponent,
    PostBlogComponent,
    BlogDetailComponent,
    ImagesBlogComponent,
    AddBookingComponent,
    EditBlogPostComponent,
    ImpressumComponent,
    TagsComponent,
    ImageOwnComponent,
    HeadingInfoComponent,
    CalendarComponent,
    GalleryBoardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
   NgxEditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
    ClipboardModule,
    StarRatingModule,
    MarkdownModule.forRoot(),
    ImageUploadModule.forRoot(),
    Daterangepicker,
    IconPickerModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    OrderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDsNMb4RG2O66JAEHYPLcw_RwAG6yzcuJQ'
    }),
    DisqusModule.forRoot( 'studiomurnauermoos'),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [AuthGuardService, AdminGuardService, AuthService, GearService],
  bootstrap: [AppComponent]
})
export class AppModule {
  private static CalendarModule: any;
}
