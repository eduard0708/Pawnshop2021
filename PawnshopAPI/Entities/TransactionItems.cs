using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class TransactionItems
    {
        public int itemId { get; set; }
        public int previousTransactionId { get; set; }
        public int trackingId { get; set; }
        public string category { get; set; }
        public string categoryDescription { get; set; }
        public string itemDescription { get; set; }
        public int appraisalValue { get; set; }
        public int sellingPrice { get; set; }
        public bool isSold { get; set; }
        public string dateSold { get; set; }
        public string newDateTransaction { get; set; }
    }
}
