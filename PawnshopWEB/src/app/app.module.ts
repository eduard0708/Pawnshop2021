import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_material-moudule/material.module';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { SidenavComponent } from './layout/sidenav.component';
import { ErrorComponent } from './pages/error.component';
import { LoginComponent } from './pages/login.component';
import { NotfoundComponent } from './pages/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashCardComponent } from './dash-card/dash-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogTransacitonComponent } from './_dialogs/dialog-transaciton.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogNewpawnerComponent } from './_dialogs/dialog-newpawner.component';
import { NotifierComponent } from './_dialogs/notifier/notifier.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { DialogNewcityComponent } from './_dialogs/dialog-newcity.component';
import { DialogNewbarangayComponent } from './_dialogs/dialog-newbarangay.component';
import { DialogNewvoucherComponent } from './_dialogs/dialog-newvoucher.component';
import { DialogNewemployeeComponent } from './_dialogs/dialog-newemployee.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ServerErrorComponent } from './pages/server-error.component';

@NgModule({
declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    ErrorComponent,
    LoginComponent,
    NotfoundComponent,
    DashboardComponent,
    DashCardComponent,
    DialogTransacitonComponent,
    DialogNewpawnerComponent,
    NotifierComponent,
    DialogNewcityComponent,
    DialogNewbarangayComponent,
    DialogNewvoucherComponent,
    DialogNewemployeeComponent,
    TestErrorsComponent,
    ServerErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,   
    InputMaskModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
