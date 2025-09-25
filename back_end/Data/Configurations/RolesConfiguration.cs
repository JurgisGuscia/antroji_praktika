using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace back_end.Data.Configurations
{
    public class RolesConfiguration : IEntityTypeConfiguration<Roles>
    {
        public void Configure(EntityTypeBuilder<Roles> entity)
        {
            entity.ToTable("roles");
            entity.HasKey(u => u.Id);

            entity.Property<string>("_pavadinimas")
                  .HasColumnName("pavadinimas")
                  .IsRequired();
        }
        
    }
}


