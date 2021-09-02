import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pawner } from '../_model/pawner';
import { TestService } from '../_service/test.service';
import { DialogNewpawnerComponent } from './dialog-newpawner.component';

@Component({
  selector: 'app-dialog-transaciton',
  templateUrl: './dialog-transaciton.component.html'
})
export class DialogTransacitonComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public transactionType:any,
    private dialogRef: MatDialogRef<DialogTransacitonComponent>,
    private testService: TestService,
    private router:Router,
    private dialog: MatDialog
  ) { }

  contactNumber;
  pawners:Pawner;
  buttonNewloan = false;
  placeHolder = "Enter Transaction Number"
  
  ngOnInit(): void {
    if(this.transactionType === "New Loan")
    {
      this.buttonNewloan = true;
      this.placeHolder = "Contact Number";
    }
     
  }

  search(){
    this.contactNumber ='';
  }

  cancel(){
    this.dialogRef.close();
  
  }

  findPawner(){
      this.testService.findPawner().subscribe(pawners => {
         for(var pawner of pawners){
          if(pawner.contactNumber === this.contactNumber) 
          {
            console.log(pawner);
            this.router.navigateByUrl('transactions/newloan');
            this.cancel();
          }
          

         }
          
      })
  }  

  createPawer(){
    this.dialogRef.close();
    const config = new MatDialogConfig();
    config.position = { top: '5rem' };
    config.width='50vh';
    config.disableClose = true;
    config.width = '25vw';

    this.dialog.open(DialogNewpawnerComponent, config)
  }

}
