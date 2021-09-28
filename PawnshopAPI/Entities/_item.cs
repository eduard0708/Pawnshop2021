using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class _item
    {
        public int Id { get; set; }
        public int? TN { get; set; }
        public string Details { get; set; }
        public int _transacitonId { get; set; }
        public _transaction _Transaction { get; set; }
    }
}
