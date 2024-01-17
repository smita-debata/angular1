import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantRoutingModule } from './tenant-routing.module';
import { TenantdashboardComponent } from './tenantdashboard/tenantdashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TenantChartComponent } from './tenant-chart/tenant-chart.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
@NgModule({
  declarations: [
    TenantdashboardComponent,
    TenantChartComponent

  ],
  imports: [
    CommonModule,
    TenantRoutingModule, MatSidenavModule, PanelMenuModule, NgxApexchartsModule, MatMenuModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatAutocompleteModule
  ]
})
export class TenantModule { }
