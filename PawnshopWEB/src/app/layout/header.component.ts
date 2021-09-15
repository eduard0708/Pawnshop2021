import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogNewbarangayComponent } from '../_dialogs/dialog-newbarangay.component';
import { DialogNewcityComponent } from '../_dialogs/dialog-newcity.component';
import { DialogNewpawnerComponent } from '../_dialogs/dialog-newpawner.component';
import { DialogNewvoucherComponent } from '../_dialogs/dialog-newvoucher.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    // private dialogRef: MatDialogRef<DialogNewcityComponent>
  ) {}

  ngOnInit(): void {}

  city() {
    const config = new MatDialogConfig();
    config.position = { top: '3rem' };
    config.width = 'auto';
    config.height = 'auto';
    config.disableClose = true;
    this.dialog.open(DialogNewcityComponent, config);
  }

  barangay() {
    const config = new MatDialogConfig();
    config.position = { top: '3rem' };
    config.width = 'auto';
    config.height = 'auto';
    config.disableClose = true;

    this.dialog.open(DialogNewbarangayComponent, config);
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
}
