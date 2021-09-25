using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PawnshopAPI.Data;
using PawnshopAPI.DTO;
using PawnshopAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.DTO.PawnerDTO;

namespace PawnshopAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PawnerController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PawnerController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("add-pawner")]
        public async Task<ActionResult> AddPawner(PawnerDto pawnerDto)
        {
            var pawner = _mapper.Map<Pawner>(pawnerDto);

            await _context.AddAsync(pawner);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<ReturnPawnerDto>(pawner));

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PawnerDto>> Pawner(int id)
        {
            var pawner = await _context.Pawners
                .Include(x => x.Addresses.Where(x => x.IsActive == true)).FirstOrDefaultAsync(x => x.PawnerId == id);

            return Ok(_mapper.Map<PawnerDto>(pawner));

        }

        [HttpGet("contact-number/{contact}")]
        public async Task< ActionResult<IEnumerable<ReturnPawnerFindByContactNumber>>> GetPawnerByContactNumber(int contact)
        {
            var pawner = await _context.Pawners.Where(x => x.ContactNumber == contact).Include(x => x.Addresses).ToArrayAsync();
            var returnPawner = _mapper.Map<IEnumerable<ReturnPawnerFindByContactNumber>>(pawner);

            return Ok(returnPawner);
        }

    }
}
