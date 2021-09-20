namespace PawnshopAPI.Entities
{
    public class CategoryDescription
    {
        public int CategoryDescriptionId { get; set; }
        public string CategoryDescriptionName { get; set; }
        public int CategoryId { get; set; }
        public Category Categories { get; set; }

    }
}