using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PawnshopAPI.Data;
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

        public Test(DataContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public ActionResult NewTrasaction(Trans t) {

            context.Trans.Add(t);
            context.SaveChanges();
            var Ptn = t.Id;
            var Itn = t.Id;

            t.Pawn.TN = Ptn;
            var items = t.Iteems;
            foreach (var item in items)
            {
                item.TN = Itn;
            }
            t.Iteems = items;

            context.Update(t);
            context.SaveChanges();

            var updatedT = t;

            return Ok();
        }
    }
}
