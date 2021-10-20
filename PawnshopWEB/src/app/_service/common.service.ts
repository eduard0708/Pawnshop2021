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

}
