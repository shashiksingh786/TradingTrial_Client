import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSymbolComponent } from './views/dashboard-symbol/dashboard-symbol.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardSymbolComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
