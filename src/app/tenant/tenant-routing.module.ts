import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantdashboardComponent } from './tenantdashboard/tenantdashboard.component';
import { TenantChartComponent } from './tenant-chart/tenant-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'tenantdash', pathMatch: 'full' },
  { path: 'tenantdash', component: TenantdashboardComponent }, {
    path: 'tenant-chart', component: TenantChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
