import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  stringToNumber(number: any): number {
    let value = +(+(number ?? 0).toString().replace(/[^\d.-]/g, '')).toFixed(2);
    return value;
  }

    /* if you will used directly the toISOString the date will be change to UTC and return
  wrong date this function will return the right date input */
  dateToISOstring(dateConvertToISOstingLocalTime) {
    let isoDate =
      new Date(dateConvertToISOstingLocalTime).getTime() -
      new Date(dateConvertToISOstingLocalTime).getTimezoneOffset() * 60000;
    return new Date(isoDate).toISOString();
  }

}
