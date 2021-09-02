import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Pawner } from '../_model/pawner';
import { TestService } from '../_service/test.service';

@Component({
  selector: 'app-dialog-transaciton',
  templateUrl: './dialog-transaciton.component.html',
  styleUrls: ['./dialog-transaciton.component.scss']
})
export class DialogTransacitonComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public transactionType:any,
    private dialogRef: MatDialogRef<DialogTransacitonComponent>,
    private testService: TestService,
    private router:Router
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


}
