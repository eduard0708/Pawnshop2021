using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class Voucher
    {
        public int VoucherId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public string Code { get; set; }
        public string Type { get; set; }
        public string CashCheque { get; set; }
        public Double Amount { get; set; }
        public string Remarks { get; set; }
    }
}
