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
        public DbSet<Barangay> Barangays { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<_transaction> _Transactions { get; set; }
        public DbSet<_pawner> _Pawners { get; set; }
        public DbSet<_item> _Items { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryDescription> CategoryDescriptions { get; set; }
    }
}