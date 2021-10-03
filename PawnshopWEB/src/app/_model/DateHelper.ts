import * as moment from 'moment';
import 'moment-precise-range-plugin';
declare module 'moment' {
  function preciseDiff(start: string | Date | moment.Moment, end: string | Date | moment.Moment, convertToObject?: boolean): any;
}

export class DateHelper {
  todayDate = new Date(new Date().setHours(0, 0, 0, 0));
  expiredDate:Date;
  maturedDate: Date;
  transactionDate:Date;  

 constructor(private dateTransaction: Date, private dateMatured?:Date, private dateExpired?:Date) {
    this.transactionDate = new Date(new Date(this.dateTransaction).setHours(0, 0, 0, 0));
    this.maturedDate = new Date(new Date(this.dateMatured).setHours(0, 0, 0, 0));
    this.expiredDate = new Date(new Date(this.dateExpired).setHours(0, 0, 0, 0));
  }

  //if you will used directly the toISOString the date will be change to UTC and return wrong date
  //this function will return the right date input
  dateToISOstring() {
    let isoDate =
      new Date(this.dateTransaction).getTime() -
      new Date(this.dateTransaction).getTimezoneOffset() * 60000;
    return new Date(isoDate).toISOString();
  }

  moments(){
    let pastMoment =  moment.preciseDiff(this.todayDate, this.transactionDate )
    return pastMoment;
  }

  days() {
    let totalDays = 395
    //  (new Date(this.todayDate).getTime() - new Date(this.transactionDate).getTime()) / (1000 * 60 * 60 * 24);
    if(totalDays >= 365){
      let days;
      let deductYears =  totalDays -  (Math.floor(totalDays/365) * 365);
      if(deductYears > 30) {
        days = deductYears - (deductYears - (Math.floor(deductYears / 30) * 30));
        console.log('days ' + days);
        
        return days
      }else{
        console.log('deductYears ' + deductYears);
        return deductYears
      }
    }

  }

  months() {
    let d1Y = this.todayDate.getFullYear();
    let d2Y = this.transactionDate.getFullYear();
    let d1M = this.todayDate.getMonth();
    let d2M = this.transactionDate.getMonth();
    let days = d1M + 12 * d1Y - (d2M + 12 * d2Y);
    let month = Math.ceil(d1M + 12 * d1Y - (d2M + 12 * d2Y));
    let months = month - (Math.floor(month/12) *12)
    return months;
  }
  years() {
    
    const totalDays = (new Date(this.todayDate).getTime() - new Date(this.transactionDate).getTime()) / (1000 * 60 * 60 * 24);
        return Math.floor(totalDays/365);
    }

  status() {
    
    if(this.todayDate > this.expiredDate){
      return 'Expired'
    }else if (this.todayDate > this.maturedDate) {
      return 'Matured'
    } else {
      return 'Premature'
    }
  }
}
