import { Injectable } from '@angular/core';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class NewloanService {

  constructor(private itemService:ItemService) { }

  getAdvanceServiceCharge(principalLoan:number){
    let advanceInterest = 0;
    if (principalLoan >= 500) {
      advanceInterest = 5;
    }else if (principalLoan >= 400 && principalLoan <= 499) {
      advanceInterest = 4;
    }else if (principalLoan >= 300 && principalLoan <= 399) {
      advanceInterest = 3;
    }else if (principalLoan >= 200 && principalLoan <= 299) {
      advanceInterest = 2;
    }else if (principalLoan >= 1 && principalLoan <= 199) {
      advanceInterest = 1;
    }
    return advanceInterest
  }

  getTotalAppraisal(){  
    let totalAppraisal = 0;
    this.itemService.items.forEach((s) => totalAppraisal = s.appraisalValue + totalAppraisal );

    return +totalAppraisal.toString().replace(/[^\d.-]/g, '');
  }

  getAdvanceInterest(){

  }

  getInterestRate(){
    let intRate = 0;
    // this.itemService.items.forEach((s) => IntRate = +s.category.toString().replace(/[^\d.-]/g, ''));
    // console.log(this.itemService.items[0].category);
    // intRate = +this.itemService.items[0].category.toString().replace(/[^\d.-]/g, '');
    
    
    return intRate;
  }
  
  
}

