import { DataSource } from '@angular/cdk/collections';
import { flatten, ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterContentInit, Component, ElementRef, Inject, Input, OnInit } from '@angular/core';
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
import { PawnerService } from '../_service/pawner.service';
import { DialogNewpawnerComponent } from './dialog-newpawner.component';

@Component({
  selector: 'app-dialog-transaciton',
  templateUrl: './dialog-transaciton.component.html',
})
export class DialogTransacitonComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public transactionType: any,
    private dialogRef: MatDialogRef<DialogTransacitonComponent>,
    private router: Router,
    private dialog: MatDialog,
    private notifierService: NotifierService,
    private pawnerService: PawnerService
  ) {}
  
  @Input() elContactNumber: ElementRef
  contactNumber: string = '';
  pawners: Pawner;
  isDataSource = false;
  existingPawner:Pawner[]=[];
  buttonNewloan = false;
  placeHolder = 'Enter Transaction Number';
  dataSource = []
  displayColumns:string[] =['contactNumber','firstName','lastName', 'action'];

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
    this.pawnerService.searchPawner().subscribe((pawners:any) => {
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
       this.notifierService.showNotification('Contact number not Found, Create new Pawner.', 'OK', 'error', {} );
 
      return;
    }
    
    if(pawners.length == 1){
      let navigationExtras = {
        state:{
          pawner: this.existingPawner[0]
        }
      }
    
      this.router.navigateByUrl('/transactions/newloan/', navigationExtras);
      //single  pawner found 

      this.dialogRef.close();
    } else {
      //multiple pawner found with same contact number
      this.dataSource = [...this.existingPawner];
      this.isDataSource = true;
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
  hideTable(){
    this.existingPawner = [];
    this.contactNumber = '';
    this.isDataSource = false; 
    
  }
  selectedPawner(pawner:Pawner){
    this.router.navigateByUrl('/transactions/newloan/', {state:{pawner: pawner}} )
    this.dialogRef.close();
  }
}
