using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public AddressController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("add-city")]
        public async Task<ActionResult> AddCity(AddCityDto newcity)
        {
            var city = _mapper.Map<City>(newcity);
            await _context.Cities.AddAsync(city);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("cities")]
        public async Task<ActionResult<City>> Cities()
        {
            return Ok(await _context.Cities.ToListAsync());
        }

        [HttpGet("city-barangay")]
        public async Task<ActionResult<IEnumerable<City>>> CityBarangay()
        {
               var cities = await _context.Cities
                    .Include(x => x.Barangays) 
                    .ToListAsync();
          return Ok(_mapper.Map<IEnumerable<ListCityDto>>(cities));


        }

        [HttpPost("add-barangay")]
        public async Task<ActionResult> AddBarangay(AddBarangayDto barangay)
        {
            var brgy = _mapper.Map<Barangay>(barangay);

            await _context.Barangays.AddAsync(brgy);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("barangays")]
        public async Task<ActionResult<Barangay>> Barangays()
        {
            return Ok(await _context.Barangays.ToListAsync());         
        }
    }
}
