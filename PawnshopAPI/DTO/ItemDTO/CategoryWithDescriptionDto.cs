using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.DTO.ItemDTO
{
    public class CategoryWithDescriptionDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public ICollection<CategoryDescriptionDto> CategoryDescriptions { get; set; }
    }
}
