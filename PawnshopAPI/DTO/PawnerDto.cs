using System;
using System.Collections.Generic;

namespace PawnshopAPI.DTO
{
    public class PawnerDto
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long ContactNumber { get; set; }
        public int EmployeeId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public bool IsActive { get; set; }
        public ICollection<AddressDto> Addresses { get; set; }
    }
}