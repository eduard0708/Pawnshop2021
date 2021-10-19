import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from '../_service/employee.service';
import { TransactionService } from '../_service/transaction.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  searchNumber:number;
  constructor(
    private dialog: MatDialog,
    public employeeService: EmployeeService,
    private router: Router,
    private transactionService:TransactionService
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
  voucherType() {
    this.router.navigateByUrl('main/settings/voucher-type')
  }
  voucherCode() {
    this.router.navigateByUrl('main/settings/voucher-code')
  }
  voucherSetting() {
    this.router.navigateByUrl('main/settings/vouchersetting')
  }
  category() {
    this.router.navigateByUrl('main/settings/category')
  }
  categoryDescription() {
    this.router.navigateByUrl('main/settings/categoryDescription')
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

  invoiceTest(){
   this.transactionService.searchTransactionById(this.searchNumber).subscribe(data => {
     if(data)
      this.router.navigateByUrl('view-transaction', {state:{transaction: data}})
   })

  }
}
