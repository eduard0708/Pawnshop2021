using PawnshopAPI.Entities;

namespace PawnshopAPI.DTO
{
    public class BarangayDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CityId { get; set; }
        public City Cities { get; set; }
    }
}