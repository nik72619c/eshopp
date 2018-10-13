import { ProfileComponent } from './../website/user/profile/profile.component';
import { AuthGuardService } from './../guards/authguard.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard/admin-dashboard.component';
import {RouterModule} from '@angular/router';
import { ShowSellerComponent } from './show-seller/show-seller.component';

@NgModule({
  imports: [
    CommonModule,FormsModule,HttpClientModule,RouterModule
   
  ],
  declarations: [AdminLoginComponent, AdminDashboardComponent,ProfileComponent, ShowSellerComponent],
  exports: [ AdminLoginComponent ],
  providers: [AuthGuardService]
})
export class AdminModule { }
