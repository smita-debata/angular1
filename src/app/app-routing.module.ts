import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PropertylistingsComponent } from './propertyListing/propertylistings/propertylistings.component';
import { AboutComponent } from './footerComponents/about/about.component';
import { ContactUsComponent } from './footerComponents/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './footerComponents/privacy-policy/privacy-policy.component';
import { HelpPageComponent } from './footerComponents/help-page/help-page.component';
import { TermsPageComponent } from './footerComponents/terms-page/terms-page.component';
import { PropertyOverviewComponent } from './propertyListing/property-overview/property-overview.component';
import { UploadimageComponent } from './uploadimage/uploadimage.component';
import { authenticationGuard } from './authentication/authentication.guard';
import { AuthService } from './authentication/auth.service';
import { returnGuard } from './authentication/return.guard';

const routes: Routes = [

  { path: '', component: DashboardComponent, canActivate: [returnGuard] },
  { path: 'propertylistings', component: PropertylistingsComponent },
  { path: 'PropertyOverview', component: PropertyOverviewComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'help', component: HelpPageComponent },
  { path: 'terms', component: TermsPageComponent },
  { path: 'uploadImage', component: UploadimageComponent },
  { path: 'landlord', canActivate: [authenticationGuard], loadChildren: () => import('./landlord/landlord.module').then(m => m.LandlordModule) },
  { path: 'tenant', canActivate: [authenticationGuard], loadChildren: () => import('./tenant/tenant.module').then(m => m.TenantModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
