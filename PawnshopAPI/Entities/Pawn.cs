namespace PawnshopAPI.Entities
{
    public class Pawn
    {
        public int Id { get; set; }
        public int TN { get; set; }
        public string Details { get; set; }
        public int TransId { get; set; }
        public Trans MyProperty { get; set; }

    }
}