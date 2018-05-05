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
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddEmpFormComponent } from './components/forms/add-emp-form/add-emp-form.component';
import { ManageVacanciesComponent } from './components/manage-vacancies/manage-vacancies.component';
import { AddVacancyComponent } from './components/forms/add-vacancy/add-vacancy.component';
import { OwnerSignupComponent } from './components/forms/owner-signup/owner-signup.component';
import { EUserComponent } from './components/e-user/e-user.component';
import { EProfileComponent } from './components/e-user/e-profile/e-profile.component';
import { SearchJobsComponent } from './components/e-user/search-jobs/search-jobs.component';
import { AppliedJobsComponent } from './components/e-user/applied-jobs/applied-jobs.component';
import { ReviewEmpComponent } from './components/review-emp/review-emp.component';
import { WorkerRevComponent } from './components/forms/worker-rev/worker-rev.component';


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
  {path:'accepted-list', component:AcceptedListComponent},
  {path:'user', component:UserComponent, canActivate: [AuthGuard],
    children: [
      { path:'', redirectTo:'dashboard', pathMatch:'full'},
      { path:'dashboard', component:DashboardComponent},
      { path:'addEmp', component:AddEmployeeComponent},
      {path:'applicant-list/:id', component:ApplicantListComponent},
      {path:'applicant-profile/:id', component:WorkerProfileComponent},
      { path:'manage-vacancies', component:ManageVacanciesComponent},
      { path:'review/:id', component:ReviewEmpComponent}  
    ]
  },
  {path:'e-user', component:EUserComponent, canActivate: [AuthGuard],
    children: [
      { path:'', redirectTo:'profile', pathMatch:'full'},
      { path:'profile', component:EProfileComponent},
      { path:'search-jobs', component:SearchJobsComponent},
      {path:'applied-jobs', component:AppliedJobsComponent}
    ]
  }
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
    AcceptedListComponent,
    UserComponent,
    DashboardComponent,
    AddEmployeeComponent,
    AddEmpFormComponent,
    ManageVacanciesComponent,
    AddVacancyComponent,
    OwnerSignupComponent,
    EUserComponent,
    EProfileComponent,
    SearchJobsComponent,
    AppliedJobsComponent,
    ReviewEmpComponent,
    WorkerRevComponent
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
  providers: [FirebaseService, AuthGuard, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {

  }
}
