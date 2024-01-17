import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandlordRoutingModule } from './landlord-routing.module';
import { PmdashboardComponent } from './pmdashboard/pmdashboard.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { CalendarModule } from 'primeng/calendar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LandlordPipe } from './landlord.pipe';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EdituserdetailsComponent } from './edituserdetails/edituserdetails.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
@NgModule({
  declarations: [
    PmdashboardComponent,
    AddpropertyComponent,
    LandlordPipe,
    ResetPasswordComponent,
    EdituserdetailsComponent,
    MaintenanceComponent,
    MyPropertiesComponent,
  ],
  imports: [
    CommonModule,
    LandlordRoutingModule, NgxApexchartsModule, MatTabsModule, MatFormFieldModule, MatSidenavModule, MatMenuModule, MatButtonModule, MatStepperModule,
    CalendarModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, FileUploadModule, MessagesModule, MatRadioModule, MatInputModule,
    MatIconModule, MatSelectModule, MatListModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule
  ]
})
export class LandlordModule { }
