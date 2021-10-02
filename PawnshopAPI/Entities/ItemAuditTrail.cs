using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class ItemAuditTrail
    {
        public int ItemAuditTrailId { get; set; }
        public int ActionBy { get; set; }
        public DateTime DateOn { get; set; }
        public string ItemStatus { get; set; }
        public string Remarks { get; set; }

        public int TransactionItemsId { get; set; }
        public TransactionItem TransactionItems { get; set; }
    }

}
