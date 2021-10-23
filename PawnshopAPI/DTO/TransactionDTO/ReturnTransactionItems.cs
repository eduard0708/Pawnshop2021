using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO.TransactionDTO
{
    public class ReturnTransactionItems
    {
        public int TransactionItemId { get; set; }
        public int PreviousTransactionId { get; set; }
        public int TrackingId { get; set; }
        public string Category { get; set; }
        public string CategoryDescription { get; set; }
        public string Description { get; set; }
        public double AppraisalValue { get; set; }
    }
}
