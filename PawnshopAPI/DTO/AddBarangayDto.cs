using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO
{
    public class AddBarangayDto
    {
        public int BarangayId { get; set; }
        public int CityId { get; set; }
        public string BarangayName { get; set; }

    }
}
