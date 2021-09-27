import { Pawner } from '../pawner/Pawner';
import { NewloanItem } from '../item/NewloanItem';

export interface Transaction {
    transactionId:number;
    pawner:Pawner,
    dateTransaction: Date,
    dateGranted: Date,
    dateMature:Date,
    dateExpired: Date,
    pawnedItems:NewloanItem[],
    totalAppraisal:number,
    principalLoan:number,
    interestRate: number,
    advanceInterest: number,
    advanceServiceCharge: number,
    netProceed: number,
}
