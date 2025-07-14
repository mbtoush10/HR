using HR.Model;
using Microsoft.EntityFrameworkCore;

namespace HR
{
    public class HRDbContext : DbContext
    {
        public HRDbContext(DbContextOptions<HRDbContext> options) : base(options)
        {

        }

        //Define Tables

        // Employees Table
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}
