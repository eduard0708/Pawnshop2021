import { Item } from "../item/item";
import { Pawner } from "../pawner/Pawner";

export interface Transaction {
  transactionId;number;
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
  apraisalValue: number;
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
  items:Item[];
  pawner:Pawner;
}
