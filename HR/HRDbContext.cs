using HR.Model;
using Microsoft.EntityFrameworkCore;

namespace HR
{
    public class HRDbContext : DbContext
    {
        public HRDbContext(DbContextOptions<HRDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Called Parent Method
            //Seed

            modelBuilder.Entity<LookUp>().HasData(
                // Employyes Positions (Major Code = 0)
                new LookUp { Id = 1, MajorCode = 0, MinorCode = 0, Name = "Employyes Positions" },
                new LookUp { Id = 2, MajorCode = 0, MinorCode = 1, Name = "HR" },
                new LookUp { Id = 3, MajorCode = 0, MinorCode = 2, Name = "Manager" },
                new LookUp { Id = 4, MajorCode = 0, MinorCode = 3, Name = "Developer" },

                // Department Types (Major Code = 1)
                new LookUp { Id = 5, MajorCode = 1, MinorCode = 0, Name = "Department Types" },
                new LookUp { Id = 6, MajorCode = 1, MinorCode = 1, Name = "Finance" },
                new LookUp { Id = 7, MajorCode = 1, MinorCode = 2, Name = "Adminstrative" },
                new LookUp { Id = 8, MajorCode = 1, MinorCode = 3, Name = "Technical" }
                );

        }

        //Define Tables

        // Employees Table
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<LookUp> LookUps { get; set; }
    }
}
