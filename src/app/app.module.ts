// import { ProfileComponent } from './admin/reusable-components/profile/profile.component';
import { AuthGuardService } from './guards/authguard.service';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AdminModule} from './admin/admin.module';
import { AppComponent } from './app.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ShowSellerComponent } from './admin/show-seller/show-seller.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductViewComponent,
  
  ],
  imports: [
    BrowserModule,AdminModule,NgxDatatableModule,
    RouterModule.forRoot([{

      path: '', component: AdminLoginComponent

    },
    {
      path: 'dashboard/sellers', component: ShowSellerComponent,
      canActivate: [AuthGuardService]
    },
  {

    path: 'dashboard', component: AdminDashboardComponent,
    canActivate: [AuthGuardService],
    children: [{

      path: 'products', component: ProductViewComponent,
      canActivateChild: [AuthGuardService]
    }
  ]

  },


  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuardService]
  // }
])
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
