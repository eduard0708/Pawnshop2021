using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO.PawnerDTO
{
    public class AddPawnerDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ContactNumber { get; set; }
        public int EmployeeId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public bool IsActive { get; set; }
        public ICollection<AddressDto> Addresses { get; set; }

    }
}


