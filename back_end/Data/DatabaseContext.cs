using Microsoft.EntityFrameworkCore;
using back_end.Models;

//using MyProject.Models;
namespace back_end.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<Groups> Groups { get; set; }
        public DbSet<Services> Services { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Rights> Rights { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(MyDbContext).Assembly);

            // Explicitly configure many-to-many for Groups ↔ Services
            modelBuilder.Entity<Groups>()
                        .HasMany(g => g.Services)
                        .WithMany(s => s.Groups)
                        .UsingEntity(j => j.ToTable("GroupService"));
                        
            // Roles ↔ Rights
            modelBuilder.Entity<Roles>()
                        .HasMany(r => r.Rights)
                        .WithMany(rt => rt.Roles)
                        .UsingEntity(j => j.ToTable("RoleRight"));
        }
            
        
    }
}
