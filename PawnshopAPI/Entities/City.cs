using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class City
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public ICollection<Barangay> Barangays { get; set; }
    }
}
