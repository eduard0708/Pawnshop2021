import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetingsRoutingModule } from './setings-routing.module';
import { SetingsComponent } from './setings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../_material-moudule/material.module';
import { InputMaskModule } from '@ngneat/input-mask';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    SetingsComponent,
  ],
  imports: [
    CommonModule,
    SetingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InputMaskModule,
    NgxMaskModule.forRoot(),
  ]
})
export class SetingsModule { }
