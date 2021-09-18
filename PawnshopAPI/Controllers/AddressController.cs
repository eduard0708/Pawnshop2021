using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Data;
using PawnshopAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly DataContext _context;

        public AddressController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<City>> Cities() {
            return await _context.Cities.ToListAsync();
        }

        [HttpPost("add-city")]
        public ActionResult AddCity(City city) {

            _context.Cities.Add(city);
            _context.SaveChanges();

            return Ok();
    
        }
        
    }
}
