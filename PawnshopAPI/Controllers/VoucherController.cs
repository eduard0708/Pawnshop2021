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
        public async Task<ActionResult<VoucherType>> AddVoucherType(VoucherTypeDto typeName)
        {
            var newType = _mapper.Map<VoucherType>(typeName);
            await _context.VoucherTypes.AddAsync(newType);
            await _context.SaveChangesAsync();

            return Ok(newType);
        }
        [HttpGet("voucher-type")]
        public async Task<ActionResult<List<VoucherType>>> GetVoucherType()
        {
            var newVoucherType = await _context.VoucherTypes.ToListAsync();
            return Ok(newVoucherType);
        }
        [HttpPost("add-voucher-code")]
        public async Task<ActionResult<VoucherCode>> AddVoucherCode(VoucherCodeDto codeName)
        {
            var newCode = _mapper.Map<VoucherCode>(codeName);
            await _context.VoucherCodes.AddAsync(newCode);
            await _context.SaveChangesAsync();

            return Ok(newCode);
        }
        [HttpGet("voucher-code")]
        public async Task<ActionResult<List<VoucherCode>>> GetVoucherCode()
        {
            var voucherCodes = await _context.VoucherCodes.ToListAsync();
            return Ok(voucherCodes);
        }

         [HttpPost("add-voucher")]
        public async Task<ActionResult<Voucher>> AddVoucher(AddVoucherDto voucher)
        {
            var newVoucher = _mapper.Map<Voucher>(voucher);
            await _context.Vouchers.AddAsync(newVoucher);
            await _context.SaveChangesAsync();

            return Ok(newVoucher);
        }
    }
}
