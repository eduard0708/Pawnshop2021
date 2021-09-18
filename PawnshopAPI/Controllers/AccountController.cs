using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Data;
using PawnshopAPI.Entities;
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

        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("add-employee")]
        public async Task<ActionResult<Employee>> AssignAccount(AddEmployeeDto employeeDto) {

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
            return employee;

        }

        [HttpPost("login")]
        public async Task<ActionResult<Employee>> Login(LoginEmployeeDto loginEmployeeDto)
        {
            var emloyee = await _context.Employees.SingleOrDefaultAsync(emp => emp.UserName == loginEmployeeDto.UserName);

            if (emloyee == null) return Unauthorized("Invalid Username.");

            using var hmac = new HMACSHA512(emloyee.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginEmployeeDto.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != emloyee.PasswordHash[i]) return Unauthorized("Invalid Password.");   
            }
            return emloyee;
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Employees.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        
    }
}
