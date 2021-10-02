import { NgModule, ViewChildren } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'transactions', loadChildren: () => import('../transactions/transactions.module')
      .then(  (m) => m.TransactionsModule),
      },
      { path: 'settings', loadChildren: () => import('../settings/setings.module').then(m => m.SetingsModule) },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
