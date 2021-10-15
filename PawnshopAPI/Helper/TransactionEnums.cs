using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Helper
{
    public class TransactionEnums
    {
       public enum TransactionType { 
        NewLoan,
        Redeem,
        Renew,
        Partial,
        Additional,
        }

        public enum TransactionStatus
        {
            Active,
            Closed,
            Cancelled,
        }
    }
}
