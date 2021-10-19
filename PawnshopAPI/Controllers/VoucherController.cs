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
    public class VoucherController : ControllerBase
    {
        private readonly DataContext context;

        public VoucherController(DataContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Voucher>> AddVoucher(Voucher voucher) {
            var newVoucher = await context.Vouchers.AddAsync(voucher);
            await context.SaveChangesAsync();

            return Ok(newVoucher);
        }
    }
}
