
/*import { PickerModule } from '@ctrl/ngx-emoji-mart';*/
// angular material components
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatSliderModule,
  MatSelectModule,
  MatStepperModule,
  MatIconModule,
  MatCheckboxModule,
  MatSnackBarModule
} from '@angular/material';

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
import {PusherService} from './services/pusher.service';
import {ToastServiceService} from './services/toast-service.service';
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
import {ServiceSelectComponent} from './components/service-select/service-select.component';
import {AutofillCitiesComponent} from './components/autofill-cities/autofill-cities.component';
import {LoaderComponent} from './components/loader/loader.component';
import {MediaModalComponent} from './components/media-modal/media-modal.component';
import {ImageModalComponent} from './components/image-modal/image-modal.component';
import {PriceExtrasComponent} from './components/price-extras/price-extras.component';
import {SearchDetailComponent} from './search-service/search-detail/search-detail.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { RequestCardComponent } from './components/request-card/request-card.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { InboxComponent } from './inbox/inbox.component';
import { AccountComponent } from './account/account.component';
import { AppointmentpickerComponent } from './components/chat/appointmentpicker/appointmentpicker.component';
import { PriceofferComponent } from './components/chat/priceoffer/priceoffer.component';
import { AgmCoreModule } from '@agm/core';
import { MapsearchComponent } from './components/mapsearch/mapsearch.component';
import { AppointmentMessageComponent } from './components/chat/appointment-message/appointment-message.component';
import { ServiceDetailsComponent } from './account/service-details/service-details.component';
import { ServiceDescriptionComponent } from './account/service-description/service-description.component';
import { ServiceTravelComponent } from './account/service-travel/service-travel.component';
import { ServiceBusinessHoursComponent } from './account/service-business-hours/service-business-hours.component';
import { ServicePriceComponent } from './account/service-price/service-price.component';
import { ServiceFaqComponent } from './account/service-faq/service-faq.component';
import { AddServiceModalComponent } from './account/add-service-modal/add-service-modal.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FullCalendarModule } from 'ng-fullcalendar';
import { EventPopupComponent } from './components/calendar/event-popup/event-popup.component';
import { PriceofferMessageComponent } from './components/chat/priceoffer-message/priceoffer-message.component';
import { FileUploaderComponent } from './components/chat/file-uploader/file-uploader.component';
import { AttachementMessageComponent } from './components/chat/attachement-message/attachement-message.component';
import { WriteReviewComponent } from './reviews/write-review/write-review.component';
import { CategoryComponent } from './category/category.component';
import { ReviewItemComponent } from './reviews/review-item/review-item.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailsComponent } from './account/user-details/user-details.component';
import {EqualValidator } from './directives/validateEqual.directive';
import { ServiceProfileComponent } from './service-profile/service-profile.component';
import { AuthGuard } from './auth/auth.guard';

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
    AccountComponent,
    AppointmentpickerComponent,
    PriceofferComponent,
    MapsearchComponent,
    AppointmentMessageComponent,
    ServiceDetailsComponent,
    ServiceDescriptionComponent,
    ServiceTravelComponent,
    ServiceBusinessHoursComponent,
    ServicePriceComponent,
    ServiceFaqComponent,
    AddServiceModalComponent,
    CalendarComponent,
    EventCalendarComponent,
    EventPopupComponent,
    PriceofferMessageComponent,
    FileUploaderComponent,
    AttachementMessageComponent,
    WriteReviewComponent,
    CategoryComponent,
    ReviewItemComponent,
    ReviewsComponent,
    UserProfileComponent,
    UserDetailsComponent,
    EqualValidator,
    ServiceProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    MatSnackBarModule,
    HttpClientModule,
    ClickOutsideModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSliderModule,
    MatSelectModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FullCalendarModule,
/*    PickerModule,*/
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBX4ApQUnjyZgcanGwjqgP1QfgBzAYRe8I',
      libraries: ['places']
    })
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
    AuthGuard,
    ApiService,
    AuthService,
    ServupService,
    PusherService,
    ToastServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
