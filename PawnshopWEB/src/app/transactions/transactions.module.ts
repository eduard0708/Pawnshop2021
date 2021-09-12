import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { NewloanComponent } from './newloan.component';
import { RedeemComponent } from './redeem.component';
import { PartialComponent } from './partial.component';
import { AdditionalComponent } from './additional.component';
import { MaterialModule } from '../_material-moudule/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';
import { TransactionsPawnerInfoComponent } from '../_components/transactions-pawner-info.component';
import { PawnerInfoComponent } from '../_components/pawner-info.component';



@NgModule({
  declarations: [
    TransactionsComponent,
    NewloanComponent,
    RedeemComponent,
    PartialComponent,
    AdditionalComponent,
    TransactionsPawnerInfoComponent,
    PawnerInfoComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InputMaskModule
  ]
})
export class TransactionsModule { }
