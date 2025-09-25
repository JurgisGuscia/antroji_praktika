using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace back_end.Data.Configurations
{
    public class ServicesConfiguration : IEntityTypeConfiguration<Services>
    {
        public void Configure(EntityTypeBuilder<Services> entity)
        {
            entity.ToTable("paslaugos");
            entity.HasKey(u => u.Id);

            entity.Property<string>("_pavadinimas")
                  .HasColumnName("Paslaugos_pavadinimas")
                  .IsRequired();

            entity.Property<float>("_kaina")
                  .HasColumnName("paslaugos_kaina")
                  .IsRequired();
        }
    }
}