using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Controllers
{
    public class AddEmployeeDto
    {
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}
