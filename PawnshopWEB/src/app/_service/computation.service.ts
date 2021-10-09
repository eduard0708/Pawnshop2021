import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment-precise-range-plugin';
declare module 'moment' {
  function preciseDiff(
    start: string | Date | moment.Moment,
    end: string | Date | moment.Moment,
    convertToObject?: boolean
  ): any;
}

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

  getInterest(
    principalLoan: number,
    interestRate: number,
    totalDays: number
  ): number {
    return +(totalDays * ((principalLoan * (interestRate / 100)) / 30)).toFixed(2);
  }

  getAdvanceInterest(principalLoan: number, interestRate: number): number {
    return +((principalLoan * (interestRate / 100)) / 30).toFixed(2);
  }

  getTotalDays(
    daysCount: number,
    monthsCount: number,
    yearsCounts: number
  ): number {
    return daysCount + monthsCount * 30 + yearsCounts * 12 * 30;
  }

  stringToNumber(number: any): number {
    let value = +(+(number ?? 0).toString().replace(/[^\d.-]/g, '')).toFixed(2);
    return value;
  }

  getDiscount(principalloan: number, interestRate:number , daysCountDiscount:number):number {
      let penalty = +(daysCountDiscount * ((principalloan * 0.02) / 30)).toFixed(2);
      let interest = +(daysCountDiscount * ((principalloan * (interestRate / 100)) / 30)).toFixed(2);
      let discount = penalty + interest ;
      return discount
  }

  isDiscount(dateMatured: Date) {
    let todayDate = moment(new Date(new Date().setHours(0, 0, 0, 0)));
    let maturedDate = moment(
      new Date(new Date(dateMatured).setHours(0, 0, 0, 0))
    );
    let daysCount = moment.duration(todayDate.diff(maturedDate)).asDays();

    //value of dayscount is less than 0 or greater than four the discount will be disabled
    let isDiscount: boolean;
    if (daysCount <= 4 && daysCount > 0) isDiscount = false;
    if (daysCount > 4 || daysCount === 0) isDiscount = true;
    if (daysCount < 0) isDiscount = true;

    return isDiscount;
  }
}
