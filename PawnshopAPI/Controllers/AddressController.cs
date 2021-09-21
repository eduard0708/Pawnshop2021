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
using PawnshopAPI.DTO.AddressDTO;
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
        public async Task<ActionResult<ReturnCityDto>> AddCity(AddCityDto newcity)
        {
            var city = _mapper.Map<City>(newcity);
            await _context.Cities.AddAsync(city);
            await _context.SaveChangesAsync();
            var returnCity = _mapper.Map<ReturnCityDto>(city);
            return Ok(returnCity);
        }

        [HttpGet("cities")]
        public async Task<ActionResult<City>> Cities()
        {
            return Ok(await _context.Cities.ToListAsync());
        }

        [HttpGet("city-barangay")]
        public async Task<ActionResult<IEnumerable<ListCityDto>>> CityBarangay()
        {
               var cities = await _context.Cities
                    .Include(x => x.Barangays) 
                    .ToListAsync();
            var listcity = _mapper.Map<IEnumerable<ListCityDto>>(cities);
          return Ok(listcity);


        }

        [HttpPost("add-barangay")]
        public async Task<ActionResult<ReturnBarangayDto>> AddBarangay(AddBarangayDto barangay)
        {
            var brgy = _mapper.Map<Barangay>(barangay);

            await _context.Barangays.AddAsync(brgy);
            await _context.SaveChangesAsync();
            return Ok(brgy);
        }

        [HttpGet("barangays")]
        public async Task<ActionResult<IEnumerable<ReturnBarangayDto>>> Barangays()
        {
            var barangay = await _context.Barangays.ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ReturnBarangayDto>>(barangay));         
        }
    }
}
