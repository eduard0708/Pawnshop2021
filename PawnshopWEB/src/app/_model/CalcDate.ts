import * as moment from 'moment';

export class CalcDate {
  today = new Date(new Date().setHours(0, 0, 0, 0));
  transactionDate;
  constructor(transactionDate: Date) {
    this.transactionDate = new Date(transactionDate.setHours(0, 0, 0, 0));
  }

  getDays() {
    const totalDays =
      new Date(
        new Date(this.today).getTime() - this.transactionDate
      ).getTime() /
      (1000 * 60 * 60 * 24);
    const daysOnly = totalDays - Math.floor(totalDays / 30) * 30;
        console.log(totalDays);
        
    return daysOnly;
  }
  getMonhts() {
    let d1Y = this.today.getFullYear();
    let d2Y = this.transactionDate.getFullYear();
    let d1M = this.today.getMonth();
    let d2M = this.transactionDate.getMonth();
    let days = d1M + 12 * d1Y - (d2M + 12 * d2Y);
    let month = Math.ceil(d1M + 12 * d1Y - (d2M + 12 * d2Y));
    let months = month - (Math.floor(month/12) *12)
    return months;
  }
  getYears() {
    return Math.ceil(
        this.today.getFullYear() - this.transactionDate.getFullYear()
    );
  }

  getStatus() {
    if (this.transactionDate <= this.today) {
      return 'Expired';
    } else {
      return 'Matured';
    }
  }
}
