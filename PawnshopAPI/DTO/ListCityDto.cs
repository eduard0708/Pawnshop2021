using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO
{
    public class ListCityDto
    {
        public int Id { get; set; }
        public int CityId { get; set; }
        public string Name { get; set; }
        public IEnumerable<BarangayDto> Barangays { get; set; }
    }
}
