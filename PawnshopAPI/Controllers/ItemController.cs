using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PawnshopAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly DataContext _context;

        public ItemController(DataContext context)
        {
            _context = context;
        }

        //[HttpPost("add-category")]
        //public async Task<ActionResult> AddCategory(AddCategoryDto addCategoryDto) { 
        //    await _context

        //}
    }
}
