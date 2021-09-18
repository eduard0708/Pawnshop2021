using PawnshopAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(Employee employee);
    }
}
