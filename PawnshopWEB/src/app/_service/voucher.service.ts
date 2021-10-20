import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddVoucher } from '../_model/voucher/addVoucher';
import { Voucher } from '../_model/voucher/voucher';
import { VoucherCode } from '../_model/voucher/voucher-code';
import { VoucherType } from '../_model/voucher/voucherType';
import { CommonService } from './common.service';
<<<<<<< HEAD
=======
import { EmployeeService } from './employee.service';
>>>>>>> 175d1c7335d5d954a03e59a8046cc9c74996a752

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  baseUrl:string = environment.baseUrl + 'voucher/';

  constructor(
    private http:HttpClient,
<<<<<<< HEAD
    private commonService:CommonService
=======
    private commonService:CommonService,
    private employeeService:EmployeeService,

>>>>>>> 175d1c7335d5d954a03e59a8046cc9c74996a752
  ) { }

  getVoucherType(){
    return this.http.get<VoucherType[]>(this.baseUrl +'voucher-type')
  }

  addVoucherType(voucherType:string){
    return this.http.post<VoucherType>(this.baseUrl +'add-voucher-type', voucherType)
  }
  getVoucherCode(){
    return this.http.get<VoucherCode[]>(this.baseUrl +'voucher-code')
  }

  addVoucherCode(voucherCode:VoucherCode){
    console.log(voucherCode);

    return this.http.post<VoucherCode>(this.baseUrl +'add-voucher-code', voucherCode)
  }

  addVoucher(voucher:AddVoucher){
    voucher.amount = this.commonService.stringToNumber(voucher.amount)
    voucher.dateEntry = new Date(voucher.dateEntry).toISOString();
<<<<<<< HEAD
    console.log(voucher);
=======
    this.employeeService.currentUser$.subscribe(emp => voucher.employeeId = emp.id)

    return this.http.post(this.baseUrl + 'add-voucher', voucher)
>>>>>>> 175d1c7335d5d954a03e59a8046cc9c74996a752
  }
}
