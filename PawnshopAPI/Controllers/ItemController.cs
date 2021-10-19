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
        public async Task<ActionResult<Category>> AddCategory(AddCategoryDto addCategoryDto)
        {
            var checkCategory = _context.Categories.FirstOrDefault( x => x.CategoryName.ToLower() == addCategoryDto.categoryName.ToLower());
            if(checkCategory != null)
            return BadRequest("Already Exist");

            var category = _mapper.Map<Category>(addCategoryDto);
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return Ok(category);    
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

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<CategoryDescriptionDto>>> GetCategoryDescriptionById(int id)
        {
            var categoryDesc = await _context.CategoryDescriptions.Where(x => x.CategoryId == id).ToListAsync();
      
            return Ok(categoryDesc);
        }


        [HttpGet("category-descriptions")]
        public async Task<ActionResult<IEnumerable<CategoryDescription>>> GetCategoryDescriptions()
        {
            var categoryDesc = await _context.CategoryDescriptions.ToListAsync();

            return Ok(categoryDesc);
        }

        [HttpPost("add-category-description")]
        public async Task<ActionResult<CategoryDescription>> AddCategoryDescription(AddCategoryDescriptionDto addCategoryDescriptionDto)
        {
            var categoryDescription = _mapper.Map<CategoryDescription>(addCategoryDescriptionDto);
            await _context.CategoryDescriptions.AddAsync(categoryDescription);
            await _context.SaveChangesAsync();

            return Ok(categoryDescription);
        }

    }
}
