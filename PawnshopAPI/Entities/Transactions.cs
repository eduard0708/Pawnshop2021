using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class Transactions
    {
        public int TransactionsId { get; set; }
        public int TrackingId { get; set; }
        public double AdvanceInterest { get; set; }
        public double AdvanceServiceCharge { get; set; }
        public double Change { get; set; }
        public DateTime? DateExpired { get; set; }
        public DateTime? DateGranted { get; set; }
        public DateTime? DateMatured { get; set; }
        public DateTime DateTransaction { get; set; }
        public double Discount { get; set; }
        public double DueAmount { get; set; }
        public int EmployeeId { get; set; }
        public string Moments { get; set; }
        public double Interest { get; set; }
        public double InterestRate { get; set; }
        public string LoanStatus { get; set; }
        public double NetPayment { get; set; }
        public double NetProceed { get; set; }
        public double PartialAmount { get; set; }
        public double Penalty { get; set; }
        public double PrincipalLoan { get; set; }
        public double ReceivedAmount { get; set; }
        public double RedeemAmount { get; set; }
        public double ServiceCharge { get; set; }
        public double AvaillableAmount { get; set; }
        public double AdditionalAmount { get; set; }
        public double NewPrincipalLoan { get; set; }
        public string Status { get; set; }
        public double TotalAppraisal { get; set; }
        public string TransactionType { get; set; }
        public  TransactionPawner TransactionPawner { get; set; }
        public ICollection<TransactionItem> TransactionItems { get; set; }
    }
}
