using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class ListViewTransaction
    {
        public int TransactionId { get; set; }
        public string TransactionType { get; set; }
        public string LoanStatus { get; set; }
        public DateTime DateTransaction { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
