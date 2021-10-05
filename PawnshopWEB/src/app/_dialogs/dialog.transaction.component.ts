import { DataSource } from '@angular/cdk/collections';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pawner } from '../_model/pawner/Pawner';
import { DialogsService } from '../_service/dialogs.service';
import { NotifierService } from '../_service/notifier.service';
import { PawnerService } from '../_service/pawner.service';

@Component({
  selector: 'app-dialog-transaciton',
  templateUrl: './dialog.transaction.component.html',
  styleUrls:['../_sass/dialogs.scss']
})
export class DialogTransacitonComponent implements OnInit {
  @Input() searchIdRef: ElementRef;

  pawners: Pawner;
  isShowTable = false;
  existingPawner: Pawner[] = [];
  buttonNewloan = false;
  placeHolder = 'Enter Transaction Number';
  public dataSource: MatTableDataSource<Pawner>;
  displayColumns: string[] = [
    'contactNumber',
    'firstName',
    'lastName',
    'action',
  ];

  searchNumber = new FormControl('', Validators.maxLength(10));

  constructor(
    @Inject(MAT_DIALOG_DATA) public transactionType: any,
    private dialogRef: MatDialogRef<DialogTransacitonComponent>,
    private router: Router,
    private notifierService: NotifierService,
    private pawnerService: PawnerService,
    private dialogService: DialogsService
  ) {
    this.dataSource = new MatTableDataSource<Pawner>();
  }
  ngOnInit(): void {
    //check if newlona it will change the transaction title
    // and the palce holder of the dialog
    if (this.transactionType === 'New Loan') {
      this.buttonNewloan = true;
      this.placeHolder = 'Contact Number';
    }
  }

  search() {
    this.searchNumber.value('');
  }

  cancel() {
    this.dialogRef.close();
  }

  onTransaction(transactionType: string) {
    if (transactionType === 'New Loan')
      this.pawnerService
        .findPawnerByContactNumber(+this.searchNumber.value)
        .subscribe((pawner) => {
          if (pawner.length === 0) {
            this.notifierService.error('No pawner exist, create pawner.');
            this.router.navigateByUrl('main/settings/pawner');
            this.dialogRef.close();
          }
          if (pawner.length === 1) {
            this.router.navigateByUrl('main/transactions/newloan/', {
              state: { pawner: pawner[0] },
            });
            this.dialogRef.close();
          }
          if (pawner.length > 1) {
            this.notifierService.info(`Multiple pawner found, select one.`);
            this.dataSource.data = pawner;
            this.isShowTable = true;
          }
        });
    //navigate to other transaction if not new loan
    if (transactionType !== 'New Loan') {
      this.dialogService
        .searchTransactionId(+this.searchNumber.value)
        .subscribe((transaction) => {
          if (transaction) {
            this.router.navigateByUrl(
              `main/transactions/${transactionType.toLocaleLowerCase()}/`,
              { state: { transaction: transaction } }
            );
            this.dialogRef.close();
          } else {
            this.notifierService.error(
              `Transaction ${this.searchNumber.value} you entered not exist!`);
          }
        });
    }
  }

  createPawner() {
    this.router.navigateByUrl('main/settings/pawner');
    this.dialogRef.close();
  }

  hideTable() {
    this.dataSource.data = [];
    this.searchNumber.value('');
    this.isShowTable = false;
  }
  selectedPawner(pawner: Pawner) {
    this.router.navigateByUrl('main/transactions/newloan/', {
      state: { pawner: pawner },
    });
    this.dialogRef.close();
  }
}
