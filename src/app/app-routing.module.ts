import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';


import { BoardAdminComponent } from './board-admin/board-admin.component';
import { QuickAddComponent } from './quick-add/quick-add.component';
import { HandRecommendationsComponent } from './hand-recommendations/hand-recommendations.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  
  { path: 'quick-add', component: QuickAddComponent },
  { path: 'hand-recommendations', component: HandRecommendationsComponent },

  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

