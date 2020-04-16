using InsuranceCalc.Models;
using Microsoft.EntityFrameworkCore;

namespace InsuranceCalc.Data
{
    public class CliCalcContext : DbContext
    {
        public CliCalcContext(DbContextOptions<CliCalcContext> options) : base(options){}

        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }  
    }
}