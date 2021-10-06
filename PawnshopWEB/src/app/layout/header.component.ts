import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from '../_service/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(
    private dialog: MatDialog,
    public employeeService: EmployeeService,
    private router: Router
    // private dialogRef: MatDialogRef<DialogNewcityComponent>
  ) { }

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.employeeService.setCurrentUser(user);
    this.isLoggedIn = !!user;
  }

  city() {
    this.router.navigateByUrl('main/settings/city');
  }

  barangay() {
    this.router.navigateByUrl('main/settings/barangay');
  }

  pawner() {
    this.router.navigateByUrl('main/settings/pawner')
  }
  voucher() {
    this.router.navigateByUrl('main/settings/voucher')
  }
  voucherSetting() {
    this.router.navigateByUrl('main/settings/vouchersetting')
  }

  employee() {
    const config = new MatDialogConfig();
    config.position = { top: '6rem' };
    config.width = 'auto';
    config.height = 'auto';
    config.disableClose = true;
  }

  logout() {
    this.employeeService.logout();
    this.router.navigateByUrl('login')
  }
  home() {
    //  if(!this.employeeService.currentUser$) 
    //     this.router.navigateByUrl('login');      

    this.router.navigateByUrl('main/dashboard')
  }
}
