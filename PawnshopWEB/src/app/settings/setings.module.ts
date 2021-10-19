import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetingsRoutingModule } from './setings-routing.module';
import { SetingsComponent } from './setings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../_material-moudule/material.module';
import { InputMaskModule } from '@ngneat/input-mask';
import { NgxMaskModule } from 'ngx-mask';
import { CategoryComponent } from './category.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryDescriptionComponent } from './category-description.component';
import { VoucherCodeComponent } from './voucher-code.component';
import { VoucherTypeComponent } from './voucher-type.component';

@NgModule({
  declarations: [
    SetingsComponent,
    CategoryComponent,
    CategoryDescriptionComponent,
    VoucherCodeComponent,
    VoucherTypeComponent,
  ],
  imports: [
    CommonModule,
    SetingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InputMaskModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
  ]
})
export class SetingsModule { }
