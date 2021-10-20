import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { NewloanComponent } from './newloan.component';
import { RedeemComponent } from './redeem.component';
import { PartialComponent } from './partial.component';
import { AdditionalComponent } from './additional.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsPawnerInfoComponent } from '../_components/transactions-pawner-info.component';
import { PawnerInfoComponent } from '../_components/pawner-info.component';
import { RenewComponent } from './renew.component';
import { MaterialModule } from '../_material-moudule/material.module';
import { InputMaskModule } from '@ngneat/input-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../_interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from '../_interceptors/error.interceptor';

@NgModule({
  declarations: [
    TransactionsComponent,
    NewloanComponent,
    RedeemComponent,
    PartialComponent,
    AdditionalComponent,
    TransactionsPawnerInfoComponent,
    PawnerInfoComponent,
    RenewComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InputMaskModule,
    FlexLayoutModule,
    NgxSpinnerModule,
  ],
  exports: [TransactionsPawnerInfoComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
})
export class TransactionsModule {}
