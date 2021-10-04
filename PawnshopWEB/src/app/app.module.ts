import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_material-moudule/material.module';
import { SidenavComponent } from './layout/sidenav.component';
import { ErrorComponent } from './pages/error.component';
import { LoginComponent } from './pages/login.component';
import { NotfoundComponent } from './pages/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashCardComponent } from './dash-card/dash-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogTransacitonComponent } from './_dialogs/dialog.transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierComponent } from './_dialogs/notifier/notifier.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { DialogNewvoucherComponent } from './_dialogs/dialog-newvoucher.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './pages/server-error.component';
import { CityComponent } from './settings/city.component';
import { BarangayComponent } from './settings/barangay.component';
import { PawnerComponent } from './settings/pawner.component';
import { EmployeeComponent } from './settings/employee.component';
import { VoucherComponent } from './settings/voucher.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { InvoiceComponent } from './pages/invoice.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ErrorComponent,
    LoginComponent,
    NotfoundComponent,
    DashboardComponent,
    DashCardComponent,
    DialogTransacitonComponent,
    NotifierComponent,
    DialogNewvoucherComponent,
    TestErrorsComponent,
    ServerErrorComponent,
    CityComponent,
    BarangayComponent,
    PawnerComponent,
    EmployeeComponent,
    VoucherComponent,
    InvoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
