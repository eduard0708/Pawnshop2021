using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class TransactionPawner
    {
        public int TransactionPawnerId { get; set; }
        public int PawnerId { get; set; }
        public int TrackingId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long ContactNumber { get; set; }
        public string City { get; set; }
        public string Barangay { get; set; }
        public string CompleteAddress { get; set; }

        public int TransactionsId { get; set; }
        public  Transactions Transactions { get; set; }
    }
}
