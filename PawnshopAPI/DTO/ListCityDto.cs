using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO
{
    public class ListCityDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<BarangayDto> Barangays { get; set; }
    }
}
