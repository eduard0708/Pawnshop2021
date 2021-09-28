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
        public ActionResult NewTrasaction(_transaction t) {

            context._Transactions.Add(t);
            context.SaveChanges();

            return Ok();
        }
    }
}
