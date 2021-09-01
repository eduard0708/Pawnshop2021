import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { NewloanComponent } from './newloan.component';
import { RedeemComponent } from './redeem.component';
import { PartialComponent } from './partial.component';
import { AdditionalComponent } from './additional.component';



@NgModule({
  declarations: [
    TransactionsComponent,
    NewloanComponent,
    RedeemComponent,
    PartialComponent,
    AdditionalComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
