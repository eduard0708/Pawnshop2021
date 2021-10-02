using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO.TransactionDTO
{
    public class AddItemAuditTrailDto
    {
        public int ItemAuditTrailId { get; set; }
        public int ActionBy { get; set; }
        public DateTime DateOn { get; set; }
        public string ItemStatus { get; set; }
        public string Remarks { get; set; }
    }
}


