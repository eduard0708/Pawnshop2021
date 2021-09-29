using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class Transaction
    {
        public double AdvanceInterest { get; set; }
        public int AdvanceServiceCharge { get; set; }
        public int Change { get; set; }
        public DateTime DateExpire { get; set; }
        public DateTime DateGranted { get; set; }
        public DateTime DateMature { get; set; }
        public DateTime DateTransaction { get; set; }
        public int Discount { get; set; }
        public int DueAmount { get; set; }
        public int EmployeeId { get; set; }
        public int Interest { get; set; }
        public int InterestRate { get; set; }
        public bool isThreeDaysLapse { get; set; }
        public string LoanStatus { get; set; }
        public int NetPayment { get; set; }
        public double netProceed { get; set; }
        public int Penalty { get; set; }
        public double PrincipalLoan { get; set; }
        public int PeceiveAmount { get; set; }
        public int RedeemAmount { get; set; }
        public int ServiceCharge { get; set; }
        public string Status { get; set; }
        public double TotalAppraisal { get; set; }
        public int TotalDays { get; set; }
        public int TotalMonths { get; set; }
        public int TotalYears { get; set; }
        public int TrackingId { get; set; }
        public int TransactionId { get; set; }
        public string TranscationType { get; set; }
        public TransactionPawner TransactionPawner { get; set; }
    }
}
