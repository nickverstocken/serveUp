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

const appRoutes: Routes = [
  // otherwise redirect to home
  { path: 'register', component: SignupComponent},
  { path: 'home', component: LandingComponent},
  { path: '', component: SearchServiceComponent,  canActivate: [
      AuthGuard
    ]},
  { path: 'search/:id', component: SearchDetailComponent,  canActivate: [
      AuthGuard
    ]},
  { path: 'category/:id', component: CategoryComponent,  canActivate: [
      AuthGuard
    ]},
  { path: 'projects', component: ProjectsComponent,  canActivate: [
      AuthGuard
    ]},
  { path: 'project/:id', component: ProjectDetailComponent,  canActivate: [
      AuthGuard
    ]},
  { path: 'project/:id/offer/:offerid', component: ProjectDetailComponent,  canActivate: [
      AuthGuard
    ]},
  { path: 'profile/:id', component: UserProfileComponent,  canActivate: [
      AuthGuard
    ]},
  { path: 'service/:id', component: ServiceProfileComponent,  canActivate: [
      AuthGuard
    ]},
  {path: 'account', component: AccountComponent,  canActivate: [
      AuthGuard
    ]},
  {path: 'account/:subnav', component: AccountComponent,  canActivate: [
      AuthGuard
    ]},
  { path: 'inbox', component: InboxComponent,  canActivate: [
      AuthGuard
    ]},
  { path: 'calendar', component: EventCalendarComponent,  canActivate: [
      AuthGuard
    ] },
  { path: '**', redirectTo: ''}
];

export const Routing = RouterModule.forRoot(appRoutes);
