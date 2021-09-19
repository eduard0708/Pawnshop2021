using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Data;
using PawnshopAPI.DTO;
using PawnshopAPI.Entities;

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

        //[HttpPost("add-city")]
        //public async Task<ActionResult>  AddCity(AddCityDto city)
        //{
        //   await _context.Cities.AddAsync(city);
        //   await _context.SaveChangesAsync();
        //    return Ok();
        //}

        [HttpGet("cities")]
        public async Task<ActionResult<City>> Cities(){
            return  Ok(await _context.Cities.ToListAsync());
        }

          [HttpPost("add-barangay")]
        public async Task<ActionResult> AddBarangay(Barangay barangay)
        {
            await _context.Barangays.AddAsync(barangay);
           await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
