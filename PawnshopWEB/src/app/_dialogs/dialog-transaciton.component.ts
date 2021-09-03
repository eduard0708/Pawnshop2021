import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pawner } from '../_model/pawner';
import { TestService } from '../_service/test.service';
import { DialogNewpawnerComponent } from './dialog-newpawner.component';

@Component({
  selector: 'app-dialog-transaciton',
  templateUrl: './dialog-transaciton.component.html',
})
export class DialogTransacitonComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public transactionType: any,
    private dialogRef: MatDialogRef<DialogTransacitonComponent>,
    private testService: TestService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  contactNumber: string;
  pawners: Pawner;
  existingPawner:Pawner[]=[];
  buttonNewloan = false;
  placeHolder = 'Enter Transaction Number';

  ngOnInit(): void {
    if (this.transactionType === 'New Loan') {
      this.buttonNewloan = true;
      this.placeHolder = 'Contact Number';
    }
  }

  search() {
    this.contactNumber = '';
  }

  cancel() {
    this.dialogRef.close();
  }

  findPawner() {
    this.testService.findPawner().subscribe((pawners) => {
      for (var pawner of pawners) {
        if (pawner.contactNumber.toString() === this.contactNumber.toString()) {
          this.existingPawner.push(pawner)
        }
      }
    }, error => console.log(error),
    () => this.checkPawnerExist(this.existingPawner)
    );   
  }

  checkPawnerExist(pawners:Pawner[]) {
    if(pawners.length == 0) {
      this.snackBar.open('NO contact pawner exist!', 'OK',{duration:1000});
      return;
    }
    
    if(pawners.length == 1){
      this.router.navigateByUrl('/transactions/newloan');
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
    }  
  }

  createPawer() {
    this.dialogRef.close();
    const config = new MatDialogConfig();
    config.position = { top: '5rem' };
    config.width = '75%';
    config.disableClose = true;

    this.dialog.open(DialogNewpawnerComponent, config);
  }
}
