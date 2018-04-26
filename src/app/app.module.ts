import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule, LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeBE from '@angular/common/locales/nl-BE';
registerLocaleData(localeBE, 'nl-BE');
import {Routing} from './app.routing';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {FooterComponent} from './footer/footer.component';
import {ImageUploaderComponent} from './components/image-uploader/image-uploader.component';
import {MultipleImageUploaderComponent} from './components/multiple-image-uploader/multiple-image-uploader.component';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './httpInterceptor';
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {ServupService} from './services/servup.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {NumbermaskDirective} from './directives/numbermask.directive';
import {searchZip, searchName, searchMultiplePipe} from './pipes/search';
import { TimeAgoPipe } from './pipes/timeago';
import {StepperComponent} from './components/stepper/stepper.component';
import {DaySelectComponent} from './components/day-select/day-select.component';
import {TagInputComponent} from './components/tag-input/tag-input.component';
import {SelectComponent} from './components/select/select.component';
import {TagComponent} from './components/tag-input/tag/tag.component';
import {SearchServiceComponent} from './search-service/search-service.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectDetailComponent} from './projects/project-detail/project-detail.component';
import {ChatComponent} from './components/chat/chat.component';
import {ProfileComponent} from './components/profile/profile.component';
import {UserPriceListComponent} from './components/user-price-list/user-price-list.component';
import {ReviewsComponent} from './components/reviews/reviews.component';
import {ReviewItemComponent} from './components/reviews/review-item/review-item.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MapAreaComponent} from './components/map-area/map-area.component';
import {ServiceSelectComponent} from './components/service-select/service-select.component';
import {AutofillCitiesComponent} from './components/autofill-cities/autofill-cities.component';
import {LoaderComponent} from './components/loader/loader.component';
import {MediaModalComponent} from './components/media-modal/media-modal.component';
import {ImageModalComponent} from './components/image-modal/image-modal.component';
import {PriceExtrasComponent} from './components/price-extras/price-extras.component';
import {SearchDetailComponent} from './search-service/search-detail/search-detail.component';
import { ClickOutsideModule } from 'ng-click-outside';
// angular material components
import {
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { RequestCardComponent } from './components/request-card/request-card.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { InboxComponent } from './inbox/inbox.component';

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
    searchMultiplePipe,
    TimeAgoPipe,
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
    UserProfileComponent,
    MapAreaComponent,
    ServiceSelectComponent,
    AutofillCitiesComponent,
    NumbermaskDirective,
    LoaderComponent,
    MediaModalComponent,
    ImageModalComponent,
    PriceExtrasComponent,
    SearchDetailComponent,
    RequestCardComponent,
    TabsComponent,
    TabComponent,
    InboxComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpClientModule,
    ClickOutsideModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'nl-BE'
    },
    ApiService,
    AuthService,
    ServupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
