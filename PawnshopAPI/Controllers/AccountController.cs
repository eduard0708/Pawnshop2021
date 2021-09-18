using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Data;
using PawnshopAPI.DTO;
using PawnshopAPI.Entities;
using PawnshopAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PawnshopAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("add-employee")]
        public async Task<ActionResult<EmployeeDto>> AssignAccount(AddEmployeeDto employeeDto) {

            if (await UserExists(employeeDto.UserName))
                return BadRequest("Username already exist!");

            using var hmac = new HMACSHA512();

            var employee = new Employee
            {
                UserName = employeeDto.UserName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(employeeDto.Password)),
                PasswordSalt = hmac.Key
            };
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return new EmployeeDto
            { 
                    Username=employee.UserName,
                    Token = _tokenService.CreateToken(employee)
            };

        }

        [HttpPost("login")]
        public async Task<ActionResult<EmployeeDto>> Login(LoginEmployeeDto loginEmployeeDto)
        {
            var employee = await _context.Employees.SingleOrDefaultAsync(emp => emp.UserName == loginEmployeeDto.UserName);

            if (employee == null) return Unauthorized("Invalid Username.");

            using var hmac = new HMACSHA512(employee.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginEmployeeDto.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != employee.PasswordHash[i]) return Unauthorized("Invalid Password.");   
            }

            return new EmployeeDto
            {
                Username = employee.UserName,
                Token = _tokenService.CreateToken(employee)
            };

        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Employees.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        
    }
}
