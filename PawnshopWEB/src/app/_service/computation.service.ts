import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment-precise-range-plugin';
import { TotalYYMMDD } from '../_model/totalYYMMDD';
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

  rate(interestRate:number){
    return interestRate / 100;
  }

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

  penalty(principalLoan: number, countYYMMDD: TotalYYMMDD): number {
    let penalty = 0;
    if (countYYMMDD.days > 0) {
        penalty = +(countYYMMDD.days * ((principalLoan * 0.02) / 30)).toFixed(2);
      } else {
      //   // penalty will be calculated by month, if days count morethan 3 days will be considered 1 month
      penalty =
        (countYYMMDD.months + 1 + countYYMMDD.years * 12) *
        (principalLoan * 0.02);
    }

    return penalty;
  }

  getInterest(
    principalLoan: number,
    interestRate: number,
    totalDays: number
  ): number {
    return +(totalDays * ((principalLoan * (interestRate / 100)) / 30)).toFixed(
      2
    );
  }

  getAdvanceInterest(principalLoan: number, interestRate: number): number {
    return +(principalLoan * (interestRate / 100)).toFixed(2);
  }

  getAdvanceServiceCharge(principalLoan: number) {
    let advanceInterest = 0;
    if (principalLoan >= 500) {
      advanceInterest = 5;
    } else {
      advanceInterest = Math.floor(principalLoan * 0.01);
    }
    return advanceInterest;
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

  getDiscount(
    principalloan: number,
    interestRate: number,
    discountNumber: number
  ): number {
    let discountMultiplier = principalloan * 0.02;
    let penaltyPerDay = discountMultiplier / 30;

    let penalty = +(discountNumber * ((principalloan * 0.02) / 30)).toFixed(2);
    let interest = +(
      discountNumber *
      ((principalloan * (interestRate / 100)) / 30)
    ).toFixed(2);
    let discount = penalty + interest;
    return discount;
  }

  getDiscountInterest(
    principalloan: number,
    interestRate: number,
    discountNumber: number
  ): number {
    let discount = 0;
    let interestPerDay = (principalloan * (interestRate / 100)) / 30;

    if (discountNumber <= 0 || discountNumber > 3) {
      discount = 0;
    } else {
      discount = discountNumber * interestPerDay;
    }
    return +discount.toFixed(2);
  }

  getDiscountPenalty(
    principalLoan: number,
    countYYMMDD: TotalYYMMDD,
    discountNumber: number
  ): number {
    let penalty = 0;

    if (discountNumber > 0 && discountNumber <= 3) {
      penalty = +((3 - discountNumber) * ((principalLoan * 0.02) / 30)).toFixed(
        2
      );
    } else {
      penalty =
        (countYYMMDD.months + 1 + countYYMMDD.years * 12) *
        (principalLoan * 0.02);
    }
    return +penalty.toFixed(2);
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

  _isDiscount(days:number){
    return days === 0 ? true : false
  }

  getInterestPerDay(
    loanAmount: number,
    numberOfDays: number,
    interestRate: number
  ) {
    let interestPerDay = (loanAmount * interestRate) / 30;

    return interestPerDay * numberOfDays;
  }

  additionalCompute(
    additionalAmount: number,
    interestRate,
    previousLoan: number,
    daysCount: number,
    interest: number,
    penalty: number
  ) {
    const rate = interestRate / 100;
    /* if less than 3 days from dateTransaction additional amount only will have advance interest
    if morethan 3 days from dateTransaction the previousloan and addtional loan will have advance interest */
    const advanctInterest =
      daysCount <= 3
        ? additionalAmount * rate
        : (additionalAmount + previousLoan) * rate;
    const advanceServiceCharge = this.getServiceCharge(additionalAmount);
    const netProceed =
      additionalAmount - (advanctInterest + advanceServiceCharge);

    let compute = {
      advanctInterest: advanctInterest,
      advanceServiceCharge: advanceServiceCharge,
      newPrincipal: previousLoan + additionalAmount,
      netProceed: netProceed - (interest + penalty),
      redeemAmount: previousLoan + interest + penalty,
      isSave: netProceed - (interest + penalty) < 0 ? true : false,
    };
    return compute;
  }

  partialCompute(
    principalLoan: number,
    partialPay: number,
    interestRate: number,
    interest: number,
    penalty: number
  ) {
    const rate = interestRate / 100;
    const newPrincipalLoan = principalLoan - partialPay;
    const advanctInterest = newPrincipalLoan * rate;
    const advanceServiceCharge = this.getServiceCharge(newPrincipalLoan);

    let compute = {
      newPrincipalLoan: newPrincipalLoan,
      advanctInterest: advanctInterest,
      advanceServiceCharge: advanceServiceCharge,
      redeemAmount: principalLoan + interest + penalty,
      netPayment: partialPay + advanctInterest + advanceServiceCharge,
    };
    return compute;
  }

  redeemCompute(
    principalLoan: number,
    interestRate: number,
    countYYMMDD: TotalYYMMDD,
  ) {
  /* if less than 3 days from dateTransaction additional amount only will have advance interest
    if morethan 3 days from dateTransaction the previousloan and addtional loan will have advance interest */
    // const penalty =
    // days <= 3
    //     ? principalLoan * this.rate(interestRate)
    //     : (additionalAmount + previousLoan) * rate;


  }

  validateAmountReceived(amountReceived: number, amountToValidate: number) {
    const validateResult = {
      change: amountReceived - amountToValidate,
      isSave: amountReceived < amountToValidate ? true : false,
    };

    return validateResult;
  }

  _getInterest(
    principalLoan: number,
    interestRate: number,
    days: number,
    months: number,
    years: number
  ) {}

  _additionalCompute(
    additionalAmount: number,
    previousLoan: number,
    interestRate: number,
    days: number,
    months: number,
    years: number
  ) {
    const rate = interestRate / 100;
    /* if less than 3 days from dateTransaction additional amount only will have advance interest
      if morethan 3 days from dateTransaction the previousloan and addtional loan will have advance interest */
    const advanctInterest =
      days <= 3
        ? additionalAmount * rate * (months + years * 12)
        : (additionalAmount + previousLoan) * rate * (months + years * 12);

    const advanceServiceCharge = this.getServiceCharge(additionalAmount);
    const netProceed =
      additionalAmount - (advanctInterest + advanceServiceCharge);
  }
}
