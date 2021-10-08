import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComputationService {
  constructor() {}

  getServiceCharge(amount: number) {
    let advanceInterest = 0;
    if (amount >= 500) {
      advanceInterest = 5;
    } else if (amount >= 400 && amount <= 499) {
      advanceInterest = 4;
    } else if (amount >= 300 && amount <= 399) {
      advanceInterest = 3;
    } else if (amount >= 200 && amount <= 299) {
      advanceInterest = 2;
    } else if (amount >= 1 && amount <= 199) {
      advanceInterest = 1;
    }
    return advanceInterest;
  }

  getPenalty(principalLoan: number, totalDays: number): number {
    return +(totalDays * ((principalLoan * 0.02) / 30)).toFixed(2);
  }

  getInterest(principalLoan:number, interestRate:number, totalDays:number):number{
    return +(totalDays * (principalLoan * (interestRate / 100) / 30)).toFixed(2);
  }

  getTotalDays(daysCount:number, monthsCount:number, yearsCounts:number):number {
    return daysCount + (monthsCount * 30) + ((yearsCounts * 12) * 30);
  }

}
