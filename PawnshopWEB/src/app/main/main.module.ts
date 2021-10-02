import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../_material-moudule/material.module';
import { HeaderComponent } from '../layout/header.component';
import { FooterComponent } from '../layout/footer.component';
import { NewloanComponent } from '../transactions/newloan.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { TransactionsPawnerInfoComponent } from '../_components/transactions-pawner-info.component';
import { TransactionsModule } from '../transactions/transactions.module';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    // NewloanComponent,
    // TransactionsPawnerInfoComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InputMaskModule,
    TransactionsModule
  ]
})
export class MainModule { }
