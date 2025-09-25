using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace back_end.Data.Configurations
{
    public class RightsConfiguration : IEntityTypeConfiguration<Rights>
    {
        public void Configure(EntityTypeBuilder<Rights> entity)
        {
            entity.ToTable("teises");
            entity.HasKey(u => u.Id);

            entity.Property<string>("_pavadinimas")
                  .HasColumnName("teise")
                  .IsRequired();
        }
        
    }
}