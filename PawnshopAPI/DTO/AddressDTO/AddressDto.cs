using System;

namespace PawnshopAPI.DTO
{
    public class AddressDto
    {
        public int AddressId { get; set; }
        public bool IsActive { get; set; }
        public string CityName { get; set; }
        public string BarangayName { get; set; }
        public string CompleteAddress { get; set; }
        public int EmployeeId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }

        
    }
}