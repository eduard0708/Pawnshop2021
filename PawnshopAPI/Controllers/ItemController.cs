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
