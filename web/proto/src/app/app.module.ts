import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService } from './services/firebase.service';
import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { OwnerComponent } from './components/owner/owner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { EmpHomeComponent } from './components/emp-home/emp-home.component';
import { AuthService } from './components/core/auth.service';
import { AuthGuard} from './components/core/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { OwnerProfileComponent } from './components/owner-profile/owner-profile.component';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { EmpJobComponent } from './components/emp-job/emp-job.component';
import { JobPageComponent } from './components/job-page/job-page.component';
import { AddVacanciesComponent } from './components/add-vacancies/add-vacancies.component';
import { EmpSignupComponent } from './components/emp-signup/emp-signup.component';
import { JobsVacantComponent } from './components/jobs-vacant/jobs-vacant.component';
import { JobsAddedListComponent } from './components/jobs-added-list/jobs-added-list.component';
import { ApplicantListComponent } from './components/applicant-list/applicant-list.component';
import { WorkerProfileComponent } from './components/worker-profile/worker-profile.component';
import { AcceptedListComponent } from './components/accepted-list/accepted-list.component';

export const appRoutes: Routes = [
  {path:'', component:LoginComponent},
  {path:'owner', component:OwnerComponent, canActivate: [AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'emp-home', component:EmpHomeComponent, canActivate: [AuthGuard]},
  {path:'signup', component:SignupComponent},
  {path:'owner-profile', component:OwnerProfileComponent},
  {path:'job-search', component:EmpJobComponent},
  {path:'add-vacancies', component:AddVacanciesComponent},
  {path:'job-search/:id', component:JobPageComponent},
  {path:'employee-signup', component:EmpSignupComponent},
  {path:'jobs-vacant', component:JobsVacantComponent},
  {path:'jobs-added', component:JobsAddedListComponent},
  {path:'applicant-list/:id', component:ApplicantListComponent},
  {path:'applicant-profile/:id', component:WorkerProfileComponent},
    {path:'accepted-list', component:AcceptedListComponent},
  
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OwnerComponent,
    NavbarComponent,
    LoginComponent,
    EmpHomeComponent,
    SignupComponent,
    OwnerProfileComponent,
    ImageCropperComponent,
    EmpJobComponent,
    JobPageComponent,
    AddVacanciesComponent,
    EmpSignupComponent,
    JobsVacantComponent,
    JobsAddedListComponent,
    ApplicantListComponent,
    WorkerProfileComponent,
    AcceptedListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FirebaseService, AuthService, AuthGuard, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {

  }
}
