using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO.TransactionDTO
{
    public class AddTransactionItemDto
    {
        public int TransactionItemId { get; set; }
        public int PreviousTransactionId { get; set; }
        public int TrackingId { get; set; }
        public string Category { get; set; }
        public string CategoryDescription { get; set; }
        public string ItemDescription { get; set; }
        public double AppraisalValue { get; set; }
        public double SellingPrice { get; set; }
        public bool isSold { get; set; }
        public DateTime? DateSold { get; set; }
        public DateTime NewDateTransaction { get; set; }
        public ICollection<AddItemAuditTrailDto>  ItemAuditTrails { get; set; }
    }
}
