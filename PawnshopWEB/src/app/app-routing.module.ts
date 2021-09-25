import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorComponent } from './pages/error.component';
import { LoginComponent } from './pages/login.component';
import { NotfoundComponent } from './pages/notfound.component';
import { ServerErrorComponent } from './pages/server-error.component';
import { NewloanComponent } from './transactions/newloan.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path:'', component: LoginComponent},
  { path:'error', component: TestErrorsComponent},
  { path:'not-found', component: NotfoundComponent},
{ path:'server-error', component: ServerErrorComponent},
  {
    path: 'transactions',
    loadChildren: () =>
      import('./transactions/transactions.module').then(
        (m) => m.TransactionsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
