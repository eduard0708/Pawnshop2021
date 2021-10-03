export interface NewTransactionComputation {
    dateTransaction:string;
    dateGranted:string;
    dateMatured:string;
    dateExpired:string;
    totalDays:number;
    totalMonths: number;
    totalYears: number;
    isThreeDaysLapse:number;
    discount: number;
    totalAppraisal:number;
    principalLoan:number;
    interestRate:number;
    advanceInterest:number;
    advanceServiceCharge:number;
    interest:number;
    serviceCharge:number;
    penalty:number;
    dueAmount:number;
    redeemAmount:number;
    netProceed:number;
    netPayment:number;
    receiveAmount:number;
    change:number;
    employeeId:number;
}