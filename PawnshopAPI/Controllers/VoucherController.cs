using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Data;
using PawnshopAPI.DTO.VoucherDTO;
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
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public VoucherController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult<Voucher>> AddVoucher(Voucher voucher) {
            var newVoucher = await _context.Vouchers.AddAsync(voucher);
            await _context.SaveChangesAsync();

            return Ok(newVoucher);
        }
        [HttpPost("add-voucher-type")]
        public async Task<ActionResult<VoucherType>> AddVoucherType(VocherTypeDto typeName)
        {
            var newType = _mapper.Map<VoucherType>(typeName);
            await _context.VoucherTypes.AddAsync(newType);
            await _context.SaveChangesAsync();

            return Ok(newType);
        }
        [HttpPost("voucher-type")]
        public async Task<ActionResult<List<VoucherType>>> GetVoucherType()
        {
            var newVoucherType = await _context.VoucherTypes.ToListAsync();
            return Ok(newVoucherType);
        }
    }
}
