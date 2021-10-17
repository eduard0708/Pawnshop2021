import { TransactionItems } from "./transaction-items";
import { TransactionPawner } from "./transaction-pawner";

export interface TransactionInformation {
  transactionsId:number;
  trackingId: number;
  dateTransaction: string;
  dateGranted?: string;
  dateMatured?: string;
  dateExpired?: string;
  transactionType: string;
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
  availlableAmount:number; //for additional only
  additionalAmount:number; //for additional only
  newPrincipalLoan:number; //for additional and Partial
  receivedAmount: number;
  change: number;
  employeeId: number;
  transactionItems:TransactionItems[];
  transactionPawner:TransactionPawner;
}
