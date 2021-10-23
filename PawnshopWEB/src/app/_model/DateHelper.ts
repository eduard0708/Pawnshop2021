import * as moment from 'moment';
import 'moment-precise-range-plugin';
declare module 'moment' {
  function preciseDiff(
    start: string | Date | moment.Moment,
    end: string | Date | moment.Moment,
    convertToObject?: boolean
  ): any;
}

interface MomentCountYYMMDD {
  years: number;
  months: number;
  days: number;
}

export class DateHelper {
  totalYears;
  totalMonths;
  totalDays;
  todayDate = new Date(new Date().setHours(0, 0, 0, 0));
  expiredDate: Date;
  maturedDate: Date;
  transactionDate: Date;
  CountYYMMDD: MomentCountYYMMDD;

  constructor(
    private dateTransaction: Date,
    private dateMatured?: Date,
    private dateExpired?: Date
  ) {
    this.transactionDate = new Date(
      new Date(this.dateTransaction).setHours(0, 0, 0, 0)
    );
    this.maturedDate = new Date(
      new Date(this.dateMatured).setHours(0, 0, 0, 0)
    );
    this.expiredDate = new Date(
      new Date(this.dateExpired).setHours(0, 0, 0, 0)
    );
  }

  /* if you will used directly the toISOString the date will be change to UTC and return
  wrong date this function will return the right date input */
  dateToISOstring() {
    let isoDate =
      new Date(this.dateTransaction).getTime() -
      new Date(this.dateTransaction).getTimezoneOffset() * 60000;
    return new Date(isoDate).toISOString();
  }

  /* return the difference of two dates as moment format */
  moments() {
    let pastMoment = moment.preciseDiff(this.maturedDate, this.todayDate);
    return pastMoment;
  }

  //retuned number of years, months
  getmoments(dateMatured: Date): MomentCountYYMMDD {
    let numberOfYYMMYY;
    //to get the difference of the two dates and returned each diff.. by days, month and year
    let pastMoment = moment.preciseDiff(
      new Date(dateMatured),
      this.todayDate,
      true
    );

    let totalDays =
      (new Date(this.todayDate).getTime() - new Date(dateMatured).getTime()) /
      (1000 * 60 * 60 * 24);
    if (totalDays < 0) {
      numberOfYYMMYY = { years: 0, months: 0, days: 0 };
    } else {
      numberOfYYMMYY = {
        years: pastMoment.years,
        months: pastMoment.months,
        days: pastMoment.days,
      };
    }
    return numberOfYYMMYY;
  }

  getStatus() {}

  status() {
    if (this.todayDate > this.expiredDate) {
      return 'Expired';
    } else if (this.todayDate > this.maturedDate) {
      return 'Matured';
    } else {
      return 'Premature';
    }
  }

  /* start to get the number of days months and years */
  getDaysMonthsYear(m: string) {
    if (m.includes('day') || m.includes('days')) {
      this.totalDays = this.getDays(m);
    } else {
      this.totalDays = 0;
    }
    if (m.includes('month') || m.includes('months')) {
      this.totalMonths = this.getMonths(m);
    } else {
      this.totalMonths = 0;
    }
    if (m.includes('year') || m.includes('years')) {
      this.totalYears = this.getYears(m);
    } else {
      this.totalYears = 0;
    }
    let momentsInYearMonthDays = {
      totalDays: this.totalDays,
      totalMonths: this.totalMonths,
      totalYears: this.totalYears,
    };
    return momentsInYearMonthDays;
  }

  getNumberOfDaysFromDateTransaction(dateTransaction: Date): MomentCountYYMMDD {
    let numDays = moment.preciseDiff(
      new Date(dateTransaction),
      this.todayDate,
      true
    );
    return numDays;
  }

  private getDays(moments: string) {
    let days = 0;
    if (moments.length < 7) {
      days = +moments.replace(/[^0-9]/g, '');
    } else {
      days = +moments
        .substr(moments.length - 7, moments.length)
        .replace(/[^0-9]/g, '');
    }

    return days;
  }

  private getMonths(moments: string) {
    if (moments.includes('year')) {
      let takeMonth = moments.split('month')[0];
      let months = +takeMonth
        .substr(takeMonth.length - 3, takeMonth.length)
        .replace(/[^0-9]/g, '');
      return months;
    } else {
      return +moments.split('month')[0].replace(/[^0-9]/g, '');
    }
  }

  private getYears(moments: string) {
    let years = +moments.split('year')[0].replace(/[^0-9]/g, '');
    return years;
  }
}
/* ends here!! to get the number of days months and years */
