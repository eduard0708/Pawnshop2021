import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNewbarangayComponent } from '../_dialogs/dialog-newbarangay.component';
import { DialogNewcityComponent } from '../_dialogs/dialog-newcity.component';
import { DialogNewemployeeComponent } from '../_dialogs/dialog-newemployee.component';
import { DialogNewpawnerComponent } from '../_dialogs/dialog-newpawner.component';
import { DialogNewvoucherComponent } from '../_dialogs/dialog-newvoucher.component';
import { EmployeeService } from '../_service/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean = false;
  constructor(
    private dialog: MatDialog,
    public employeeService:EmployeeService,
    private router:Router
    // private dialogRef: MatDialogRef<DialogNewcityComponent>
  ) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user = JSON.parse(localStorage.getItem('user'));
    this.employeeService.setCurrentUser(user);
    this.isLoggedIn = !!user;
  }

  // city() {
  //   const config = new MatDialogConfig();
  //   config.position = { top: '3rem' };
  //   config.width = 'auto';
  //   config.height = 'auto';
  //   config.disableClose = true;
  //   this.dialog.open(DialogNewcityComponent, config);
  // }

  city(){
    this.router.navigateByUrl('settings/city');
  }
  // barangay() {
  //   const config = new MatDialogConfig();
  //   config.position = { top: '3rem' };
  //   config.width = 'auto';
  //   config.height = 'auto';
  //   config.disableClose = true;

  //   this.dialog.open(DialogNewbarangayComponent, config);
  // }

barangay(){
  this.router.navigateByUrl('settings/barangay');
}
  pawner() {
    const config = new MatDialogConfig();
    config.position = { top: '6rem' };
    config.width = '70rem';
    config.height = 'auto';
    config.disableClose = true;

    this.dialog.open(DialogNewpawnerComponent, config);
  }
  voucher() {
    const config = new MatDialogConfig();
    config.position = { top: '6rem' };
    config.width = 'auto';
    config.height = 'auto';
    config.disableClose = true;

    this.dialog.open(DialogNewvoucherComponent, config);
  }

  employee(){
    const config = new MatDialogConfig();
    config.position = { top: '6rem' };
    config.width = 'auto';
    config.height = 'auto';
    config.disableClose = true;

    this.dialog.open(DialogNewemployeeComponent, config);
  }
  
  logout(){
    this.employeeService.logout();
  }
  home(){
    //  if(!this.employeeService.currentUser$) 
    //     this.router.navigateByUrl('login');      

  this.router.navigateByUrl('')
  }
}
