using InsuranceCalc.Models;
using Microsoft.EntityFrameworkCore;

namespace InsuranceCalc.Data
{
    public class InsuranceCalcContext : DbContext
    {
        public InsuranceCalcContext(DbContextOptions<InsuranceCalcContext> options) : base(options){}

        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }  
    }
}