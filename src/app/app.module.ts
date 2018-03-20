import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {Routing} from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import {MultipleImageUploaderComponent } from './components/multiple-image-uploader/multiple-image-uploader.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './httpInterceptor';
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {ServupService } from './services/servup.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {searchZip, searchName} from './pipes/search';
import { StepperComponent } from './components/stepper/stepper.component';
import { DaySelectComponent } from './components/day-select/day-select.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { SelectComponent } from './components/select/select.component';
import { TagComponent } from './components/tag-input/tag/tag.component';
import { SearchServiceComponent } from './search-service/search-service.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserPriceListComponent } from './components/user-price-list/user-price-list.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewItemComponent } from './components/reviews/review-item/review-item.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LandingComponent,
    FooterComponent,
    ImageUploaderComponent,
    MultipleImageUploaderComponent,
    searchZip,
    searchName,
    StepperComponent,
    DaySelectComponent,
    TagInputComponent,
    SelectComponent,
    TagComponent,
    SearchServiceComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    ChatComponent,
    ProfileComponent,
    UserPriceListComponent,
    ReviewsComponent,
    ReviewItemComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    Routing,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ApiService,
    AuthService,
    ServupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
