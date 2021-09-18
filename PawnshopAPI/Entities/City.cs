using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public IEnumerable<Barangay> Barangays { get; set; }
    }
}
