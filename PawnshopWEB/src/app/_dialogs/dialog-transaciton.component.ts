import { ThrowStmt } from '@angular/compiler';
import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotifierConfig } from '../_model/notifier-config';
import { Pawner } from '../_model/pawner';
import { NotifierService } from '../_service/notifier.service';
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
    private snackBar: MatSnackBar,
    private notifierService: NotifierService
  ) {}

  contactNumber: string = '';
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
    this.testService.findPawner().subscribe((pawners:any) => {
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
     const config = new NotifierConfig();
       this.notifierService.showNotification('Contact number not Found, Create new Pawner.', 'OK', 'success', {} );
 
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
