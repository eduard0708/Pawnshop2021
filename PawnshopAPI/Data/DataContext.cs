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
        public DbSet<Trans> Trans { get; set; }
        public DbSet<Pawn> Pawns { get; set; }
        public DbSet<Iteem> Iteems { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryDescription> CategoryDescriptions { get; set; }

        public DbSet<TransactionPawner> TransactionPawners { get; set; }
        public DbSet<Transactions> Transactions { get; set; }
        public DbSet<TransactionItem> TransactionItems { get; set; }
   
    }
}