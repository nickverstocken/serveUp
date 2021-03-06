import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {SearchServiceComponent} from './search-service/search-service.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectDetailComponent} from './projects/project-detail/project-detail.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {SearchDetailComponent} from './search-service/search-detail/search-detail.component';
import {InboxComponent} from './inbox/inbox.component';
import {AccountComponent} from './account/account.component';
import {EventCalendarComponent} from './event-calendar/event-calendar.component';
import {CategoryComponent} from './category/category.component';
import {ServiceProfileComponent} from './service-profile/service-profile.component';
import {AuthGuard} from './auth/auth.guard';
import {LoginComponent} from './login/login.component';

const appRoutes: Routes = [
  // otherwise redirect to home
  { path: 'register', component: SignupComponent},
  { path: 'home', component: LandingComponent},
  { path: '', component: SearchServiceComponent},
  { path: 'login', component: LoginComponent},
  { path: 'search/:id', component: SearchDetailComponent},
  { path: 'category/:id', component: CategoryComponent},
  { path: 'projects', component: ProjectsComponent},
  { path: 'projects/:id', component: ProjectDetailComponent},
  { path: 'projects/:id/offer/:offerid', component: ProjectDetailComponent},
  { path: 'profile/:id', component: UserProfileComponent},
  { path: 'service/:id', component: ServiceProfileComponent},
  {path: 'account', component: AccountComponent},
  {path: 'account/:subnav', component: AccountComponent},
  { path: 'inbox', component: InboxComponent},
  { path: 'calendar', component: EventCalendarComponent},
  { path: '**', redirectTo: ''}
];

export const Routing = RouterModule.forRoot(appRoutes, { useHash: true });
