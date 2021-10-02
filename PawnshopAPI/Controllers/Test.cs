using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Data;
using PawnshopAPI.DTO.TestDTO;
using PawnshopAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Test : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Test(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public ActionResult NewTrasaction(TransDto tdto) {

            var t = mapper.Map<Trans>(tdto);

            context.Trans.Add(t);
            context.SaveChanges();


            var items = t.Iteems;
            foreach (var item in items)
            {
                item.TN = t.Id;
            }

            t.Iteems = items;
            t.TN = t.Id;
            t.Pawn.TN = t.Id;

            context.Update(t);
            context.SaveChanges();

            var updatedT = t;

            return Ok();
        }

        [HttpGet("{tn}")]
        public ActionResult GetTrans(int tn) {

            var t = context.Trans
                .Include(p => p.Pawn)
                .Include(x => x.Iteems)
                .FirstOrDefault(x => x.TN == tn);

            var items = context.Iteems.Where(x => x.TN == 12).ToList();
            return Ok(t);
        }
    }
}
