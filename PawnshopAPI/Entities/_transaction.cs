using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class _transaction
    {
        public int Id { get; set; }
        public int? TN { get; set; }
        public string Details { get; set; }
        public int _PawnerId { get; set; }
        public _pawner _Pawner { get; set; }
        public IEnumerable<_item> _Items { get; set; }
    }
}
