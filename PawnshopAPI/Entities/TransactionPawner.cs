using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class TransactionPawner
    {
        public int pawnerTransactionId { get; set; }
        public int pawnerId { get; set; }
        public int trackingId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string contactNumber { get; set; }
        public string city { get; set; }
        public string barangay { get; set; }
        public string completeAddress { get; set; }
        public int TransactionId { get; set; }
        public Transaction Transactions { get; set; }
    }
}
