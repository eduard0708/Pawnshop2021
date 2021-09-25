import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalComponent } from './additional.component';
import { NewloanComponent } from './newloan.component';
import { PartialComponent } from './partial.component';
import { RedeemComponent } from './redeem.component';
import { RenewComponent } from './renew.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [{
  path: '', component: TransactionsComponent,
  children: [
    { path: 'newloan/:pawner', component: NewloanComponent },
    { path: 'redeem/:transaction', component: RedeemComponent },
    { path: 'partial/:transaction', component: PartialComponent },
    { path: 'additional/:transaction', component: AdditionalComponent },
    { path: 'renew/:transaction', component: RenewComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
