import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './pages/login.component';

const routes: Routes = 
[
  {path:'login', component:LoginComponent},
  {path:'', component:DashboardComponent},
{ path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
