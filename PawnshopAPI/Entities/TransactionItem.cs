using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class TransactionItem
    {   
   
        public int TransactionItemId { get; set; }
        public int PreviousTransactionId { get; set; }
        public int TrackingId { get; set; }
        public string Category { get; set; }
        public string CategoryDescription { get; set; }
        public string Description { get; set; }
        public double AppraisalValue { get; set; }
        public double SellingPrice { get; set; }
        public bool isSold { get; set; }
        public DateTime? DateSold { get; set; }
        public DateTime NewDateTransaction { get; set; }
        public int TransactionId { get; set; }
        public Transactions Transactions { get; set; }
        public ICollection<ItemAuditTrail>  ItemAuditTrails { get; set; }
    }
}
