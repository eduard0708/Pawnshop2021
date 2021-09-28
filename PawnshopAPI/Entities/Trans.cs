using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class Trans
    {
        public int Id { get; set; }
        public int? TN { get; set; }
        public string Details { get; set; }
        public Pawn Pawn { get; set; }
        public ICollection<Iteem> Iteems { get; set; }
    }
}
