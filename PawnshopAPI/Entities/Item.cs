using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class Item
    {
        public int ItemId { get; set; }
        public string Category { get; set; }
        public string CategoryDescription { get; set; }
        public string Description { get; set; }
        public double AppraisalValue { get; set; }

    }
}
