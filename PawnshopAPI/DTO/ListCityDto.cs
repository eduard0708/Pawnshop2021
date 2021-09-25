using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO
{
    public class ListCityDto
    {
        public int CityId { get; set; }
        public string CityName { get; set; }
        public ICollection<BarangayDto> Barangays { get; set; }
    }
}
