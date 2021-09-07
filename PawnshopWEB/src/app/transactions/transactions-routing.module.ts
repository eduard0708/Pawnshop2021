import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalComponent } from './additional.component';
import { NewloanComponent } from './newloan.component';
import { PartialComponent } from './partial.component';
import { RedeemComponent } from './redeem.component';
import { TransactionsComponent } from './transactions.component';

const routes: Routes = [{ path: '', component: TransactionsComponent,
children:[
  {path:'newloan/:pawner', component:NewloanComponent},
  {path:'redeem', component:RedeemComponent},
  {path:'partial', component:PartialComponent},
  {path:'additional', component:AdditionalComponent},
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
