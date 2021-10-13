import { TransactionItems } from "./transaction-items";
import { TransactionPawner } from "./transaction-pawner";

export interface TransactionInformation {
  transactionsId:number;
  trackingId: number;
  dateTransaction: string;
  dateGranted?: string;
  dateMatured?: string;
  dateExpired?: string;
  transcationType: string;
  status: string;
  loanStatus: string;
  moments:string;
  totalAppraisal: number;
  principalLoan: number;
  interestRate: number;
  interest: number;
  penalty: number;
  dueAmount: number;
  discount: number;
  advanceInterest: number;
  advanceServiceCharge: number;
  serviceCharge: number;
  netProceed: number; //for newloan, for additional
  netPayment: number; // for partial
  redeemAmount: number; //for redeem only
  partialAmount:number; //for partial
  addtionalAmount:number; //for additional only
  receiveAmount: number;
  change: number;
  employeeId: number;
  transactionItems:TransactionItems[];
  transactionPawner:TransactionPawner;
}
