using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO.PawnerDTO
{
    public class ReturnPawnerDto
    {
        public int PawnerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long ContactNumber { get; set; }
        public ICollection<AddressDto> Addresses { get; set; }
    }
}
