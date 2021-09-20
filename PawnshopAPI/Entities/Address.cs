namespace PawnshopAPI.Entities
{
    public class Address
    {
        public int AddressId { get; set; }
        public string CityName { get; set; }
        public string BarangayName { get; set; }
        public string CompleteAddress { get; set; }
        public int PawnerId { get; set; }
        public Pawner Pawner { get; set; }
    }
}