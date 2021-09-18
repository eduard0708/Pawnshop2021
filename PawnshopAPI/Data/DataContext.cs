using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Entities;

namespace PawnshopAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Pawner> Pawners { get; set; }
        public DbSet<City> Cities { get; set; }
    }
}