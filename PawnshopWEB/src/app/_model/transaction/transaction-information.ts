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
  discount?: number;
  totalAppraisal: number;
  principalLoan: number;
  interestRate: number;
  advanceInterest: number;
  advanceServiceCharge: number;
  interest: number;
  serviceCharge: number;
  penalty?: number;
  dueAmount?: number;
  redeemAmount?: number;
  netProceed?: number;
  netPayment?: number;
  receiveAmount?: number;
  change?: number;
  employeeId: number;
  transactionItems:TransactionItems[];
  transactionPawner:TransactionPawner;
}
