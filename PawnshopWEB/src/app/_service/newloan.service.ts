import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pawner } from '../_model/pawner/Pawner';
import { User } from '../_model/user';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root',
})
export class NewloanService {

  uri:string = 'http://localhost:3000/';

  constructor(private itemService: ItemService, private http:HttpClient) {}

  getAdvanceServiceCharge(principalLoan: number) {
    let advanceInterest = 0;
    if (principalLoan >= 500) {
      advanceInterest = 5;
    } else if (principalLoan >= 400 && principalLoan <= 499) {
      advanceInterest = 4;
    } else if (principalLoan >= 300 && principalLoan <= 399) {
      advanceInterest = 3;
    } else if (principalLoan >= 200 && principalLoan <= 299) {
      advanceInterest = 2;
    } else if (principalLoan >= 1 && principalLoan <= 199) {
      advanceInterest = 1;
    }
    return advanceInterest;
  }

  getTotalAppraisal() {
    let totalAppraisal = 0;
    if (this.itemService.items.length > 0) {
      this.itemService.items.forEach((s) => {
        totalAppraisal =
          +s.appraisalValue.toString().replace(/[^\d.-]/g, '') + totalAppraisal;
      });
    }
    return totalAppraisal;
  }

  getAdvanceInterest(principalLoan: number) {
    return principalLoan * (this.getInterestRate() / 100);
  }

  getInterestRate() {
    if (this.itemService.items.length > 0)
      return this.itemService.items[0].categoryId === 1 ? 3 : 5;

    return 0;
  }

  normalizedNewloanInfo(transaction, pawner, items){
    let user: User = JSON.parse(localStorage.getItem('user'));
    console.log(transaction);
    console.log(pawner);
    console.log(items);
    console.log('normalize');
    
    const savePawner:Pawner = {
      pawnerId:pawner.pawnerId,
      firstName:"",
      lastName:"",
      contactNumber:'',
      city:"",
      barangay:"",
      addresses:[]
    }

  //   const transaction = {
  //    transactionId: 0,
  //    trackingId: 0,
  //    dateTransaction: this.today.toISOString(),
  //    dateGranted: this.today.toISOString(),
  //    dateMature: this.dateMatured.toISOString(),
  //    dateExpire: this.dateExpired.toISOString(),
  //    transcationType: TrasactionType.Newloan,
  //    status: Status.Active,
  //    loanStatus: LoanStatus.New,
  //    totalDays: null,
  //    totalMonths: null,
  //    totalYears: null,
  //    isThreeDaysLapse: false,
  //    discount: null,
  //    apraisalValue: +(+(this.newLoanForm.controls.appraisalValue.value ?? 0)
  //      .toString()
  //      .replace(/[^\d.-]/g, '')),
  //    principalLoan: +(+(this.newLoanForm.controls.principalLoan.value ?? 0)
  //      .toString()
  //      .replace(/[^\d.-]/g, '')),
  //    interestRate: +(+(this.newLoanForm.controls.interestRate.value ?? 0)
  //      .toString()
  //      .replace(/[^\d.-]/g, '')),
  //    advanceInterest: +(+(this.newLoanForm.controls.advanceInterest.value ?? 0)
  //      .toString()
  //      .replace(/[^\d.-]/g, '')),
  //    advanceServiceCharge: +(+(
  //      this.newLoanForm.controls.advanceServiceCharge.value ?? 0
  //    )
  //      .toString()
  //      .replace(/[^\d.-]/g, '')),
  //    interest: +(+(this.newLoanForm.controls.interest.value ?? 0)
  //      .toString()
  //      .replace(/[^\d.-]/g, '')),
  //    serviceCharge: +(+(this.newLoanForm.controls.serviceCharge.value ?? 0)
  //      .toString()
  //      .replace(/[^\d.-]/g, '')),
  //    penalty: null,
  //    dueAmount: null,
  //    redeemAmount: null,
  //    netProceed: +(+(this.newLoanForm.controls.netProceed.value ?? 0)
  //      .toString()
  //      .replace(/[^\d.-]/g, '')),
  //    netPayment: null,
  //    receiveAmount: null,
  //    change: null,
  //    employeeId: user.id,
  //    // items: this.itemService.items
  //    // pawner:this.pawnerInfo;

  //  };
  }
    
}
