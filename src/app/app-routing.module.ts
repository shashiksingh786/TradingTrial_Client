import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardSymbolComponent } from './views/dashboard-symbol/dashboard-symbol.component';
import { SymbolDetailsComponent } from './views/symbol-details/symbol-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardSymbolComponent },
  { path: 'symbol/:id', component: SymbolDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
