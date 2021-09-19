using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PawnshopAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BuggyController : ControllerBase
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret";
        }
        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var thing = _context.Users.Find(-1)
            return thing;
        }
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret";
        }
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret";
        }
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret";
        }
    }
}
