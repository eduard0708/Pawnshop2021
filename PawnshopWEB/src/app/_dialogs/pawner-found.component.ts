import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pawner } from '../_model/pawner/Pawner';
import { DialogTransacitonComponent } from './dialog.transaction.component';

@Component({
  selector: 'app-pawner-found',
  templateUrl: './pawner-found.component.html',
  styleUrls:['../_sass/dialogs_scss/pawner-found.scss']
})
export class PawnerFoundComponent implements OnInit {
  foundPawner: Pawner[] = [];
  public dataSource: MatTableDataSource<Pawner>;
  displayColumns: string[] = [
    'contactNumber',
    'firstName',
    'lastName',
    'action',
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public pawner: any,
    private dialogRef: MatDialogRef<PawnerFoundComponent>,
    private router:Router,
    private dialog:MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Pawner>();
   
   }

  ngOnInit(): void {
    this.foundPawner = [... this.pawner] ;
    this.dataSource.data = this.foundPawner;
  
  }

  selectedPawner(pawner){
    this.router.navigateByUrl('main/transactions/newloan/', {
      state: { pawner: pawner },
    });
    this.dialogRef.close();

  }

  create(){
    this.router.navigateByUrl('main/settings/pawner');
    this.dialogRef.close();
  }

  search() {
    const config = new MatDialogConfig();
    config.position = { top: '5rem' };
    config.disableClose = true;
    config.data = 'New Loan';
    config.width = '20vw';

    this.dialog.open(DialogTransacitonComponent, config);
    this.dialogRef.close();
  }
  cancel(){
    this.dialogRef.close();
  }
}
