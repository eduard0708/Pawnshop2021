import { Pawner } from '../_model/pawner';
import { Item } from './item';

export interface Transaction {
    transactionId:number;
    pawner:Pawner,
    dateTransaction: Date,
    dateGranted: Date,
    dateMature:Date,
    dateExpired: Date,
    pawnedItems:Item[],
    totalAppraisal:number,
    principalLoan:number,
    interestRate: number,
    advanceInterest: number,
    advanceServiceCharge: number,
    netProceed: number,
}
