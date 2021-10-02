using PawnshopAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO.TransactionDTO
{
    public class AddTransactionDto
    {
        public int TransactionsId { get; set; }
        public int TrackingId { get; set; }
        public double AdvanceInterest { get; set; }
        public double AdvanceServiceCharge { get; set; }
        public double Change { get; set; }
        public DateTime DateExpire { get; set; }
        public DateTime DateGranted { get; set; }
        public DateTime DateMature { get; set; }
        public DateTime DateTransaction { get; set; }
        public double Discount { get; set; }
        public double DueAmount { get; set; }
        public int EmployeeId { get; set; }
        public double Interest { get; set; }
        public double InterestRate { get; set; }
        public bool isThreeDaysLapse { get; set; }
        public string LoanStatus { get; set; }
        public double NetPayment { get; set; }
        public double netProceed { get; set; }
        public double Penalty { get; set; }
        public double PrincipalLoan { get; set; }
        public double PeceiveAmount { get; set; }
        public double RedeemAmount { get; set; }
        public double ServiceCharge { get; set; }
        public string Status { get; set; }
        public double TotalAppraisal { get; set; }
        public int TotalDays { get; set; }
        public int TotalMonths { get; set; }
        public int TotalYears { get; set; }
        public string TranscationType { get; set; }

        public AddTransactionPawnerDto TransactionPawner { get; set; }
        public ICollection<AddTransactionItemDto> TransactionItems { get; set; }
    }
}
