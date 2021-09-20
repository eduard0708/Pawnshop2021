using System.Collections.Generic;

namespace PawnshopAPI.DTO
{
    public class PawnerDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ContactNumber { get; set; }
        public ICollection<AddressDto> Addresses { get; set; }
    }
}