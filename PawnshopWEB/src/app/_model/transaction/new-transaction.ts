import { Pawner } from "../pawner/Pawner";
import { NewTransactionPawner } from "./new-transaction-pawner";
import { NewTransactionItems } from "./new-trasaction-items";

export interface NewTransaction {
  transactionsId:number;
  trackingId: number;
  dateTransaction: string;
  dateGranted?: string;
  dateMature?: string;
  dateExpire?: string;
  transcationType: string;
  status: string;
  loanStatus: string;
  totalDays?: number;
  totalMonths?: number;
  totalYears?: number;
  isThreeDaysLapse: boolean;
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
  transactionItems:NewTransactionItems[];
  transactionPawner:NewTransactionPawner;
}
