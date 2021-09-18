namespace PawnshopAPI.Entities
{
    public class Barangay
    {
        public int Id { get; set; }
        public string BarangayName { get; set; }
        public int CityId { get; set; }
        public City Cities { get; set; }

    }
}