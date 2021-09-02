import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_moudule/material.module';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { SidenavComponent } from './layout/sidenav.component';
import { ErrorComponent } from './pages/error.component';
import { LoginComponent } from './pages/login.component';
import { NotfoundComponent } from './pages/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashCardComponent } from './dash-card/dash-card.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogTransacitonComponent } from './_dialogs/dialog-transaciton.component';

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

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
