using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Data;
using PawnshopAPI.DTO;
using PawnshopAPI.DTO.ItemDTO;
using PawnshopAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ItemController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("add-category")]
        public async Task<ActionResult> AddCategory(AddCategoryDto addCategoryDto)
        {
            var category = _mapper.Map<Category>(addCategoryDto);
            await _context.Categories.AddAsync(category);
           await _context.SaveChangesAsync();

            return Ok();    
        }

        [HttpGet("category")]
        public async Task<ActionResult<IEnumerable<ListCategoryDto>>> Categories()
        {
            var category = await _context.Categories.ToListAsync();

            var categoryReturn = _mapper.Map<IEnumerable<ListCategoryDto>> (category);
            return Ok(categoryReturn);
        }


        [HttpGet("category-description")]
        public async Task<ActionResult<IEnumerable<CategoryWithDescriptionDto>>> CategoryWithDescription()
        {
            var category = await _context.Categories
             .Include(x => x.CategoryDescriptions)
             .ToListAsync();

            var categoryReturn = _mapper.Map<IEnumerable<CategoryWithDescriptionDto>>(category);

            return Ok(categoryReturn);
        }

        [HttpPost("add-category-description")]
        public async Task<ActionResult> AddCategoryDescription(AddCategoryDescriptionDto addCategoryDescriptionDto)
        {
            var categoryDescription = _mapper.Map<CategoryDescription>(addCategoryDescriptionDto);
            await _context.CategoryDescriptions.AddAsync(categoryDescription);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
