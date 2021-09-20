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
        public async Task<ActionResult> AddPawner(PawnerDto pawnerDto) {
            var pawner = _mapper.Map<Pawner>(pawnerDto);

            await _context.AddAsync(pawner);
            await _context.SaveChangesAsync();

            return Ok();

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PawnerDto>> Pawner(int id)
        {
            var pawner = await _context.Pawners
                .Include(x => x.Addresses.Where(x => x.IsActive == true)).FirstOrDefaultAsync(x => x.Id == id);
    
            return Ok(_mapper.Map<PawnerDto>(pawner));

        }

    }
}
