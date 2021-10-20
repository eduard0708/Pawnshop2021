import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { InvoiceComponent } from './pages/invoice.component';
import { LoginComponent } from './pages/login.component';
import { NotfoundComponent } from './pages/notfound.component';
import { ServerErrorComponent } from './pages/server-error.component';
import { ViewTransactionComponent } from './pages/view-transaction.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'error', component: TestErrorsComponent },
  { path: 'not-found', component: NotfoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: 'invoicetest', component: InvoiceComponent },
  { path: 'view-transaction', component: ViewTransactionComponent },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
