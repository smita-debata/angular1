import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { PropertylistingsComponent } from './propertyListing/propertylistings/propertylistings.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MatSliderModule } from '@angular/material/slider';
import { CarouselModule } from 'primeng/carousel';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { MessagesModule } from 'primeng/messages';
import { MatMenuModule } from '@angular/material/menu';
import { SliderModule } from 'primeng/slider';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { PropertyfilterPipe } from './propertyfilter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { AboutComponent } from './footerComponents/about/about.component';
import { ContactUsComponent } from './footerComponents/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './footerComponents/privacy-policy/privacy-policy.component';
import { HelpPageComponent } from './footerComponents/help-page/help-page.component';
import { TermsPageComponent } from './footerComponents/terms-page/terms-page.component';
import { ShareModalComponent } from './propertyListing/share-modal/share-modal.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { MatDialogModule } from '@angular/material/dialog';
import { PropertyOverviewComponent } from './propertyListing/property-overview/property-overview.component';
import { GalleriaModule } from 'primeng/galleria';
import { UploadimageComponent } from './uploadimage/uploadimage.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    PropertylistingsComponent,
    PropertyfilterPipe,
    AboutComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    HelpPageComponent,
    TermsPageComponent,
    ShareModalComponent,
    PropertyOverviewComponent,
    UploadimageComponent,
  ],
  imports: [
    BrowserModule, MatSliderModule, CarouselModule, NgxApexchartsModule, MessagesModule, MatMenuModule, SliderModule, AutoCompleteModule, MatIconModule,
    AppRoutingModule, DialogModule, BrowserAnimationsModule, MatButtonModule, SplitButtonModule, HttpClientModule, MatAutocompleteModule, GalleriaModule, ToastModule,
    MatFormFieldModule, MatInputModule, MatRadioModule, MatSidenavModule, ButtonModule, DropdownModule, FormsModule, ReactiveFormsModule, MatSelectModule, ShareButtonsModule, ShareIconsModule, MatDialogModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
