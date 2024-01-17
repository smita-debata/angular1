import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmdashboardComponent } from './pmdashboard/pmdashboard.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';

const routes: Routes = [
  { path: '', redirectTo: 'landlorddash', pathMatch: 'full' },
  { path: 'landlorddash', component: PmdashboardComponent },
  { path: 'add-property', component: AddpropertyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandlordRoutingModule { }
