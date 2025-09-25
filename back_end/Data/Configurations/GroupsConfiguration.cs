using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace back_end.Data.Configurations
{
    public class GroupsConfiguration : IEntityTypeConfiguration<Groups>
    {
        public void Configure(EntityTypeBuilder<Groups> entity)
        {
            entity.ToTable("bendrijos");
            entity.HasKey(u => u.Id);

            entity.Property<string>("_pavadinimas")
                  .HasColumnName("bendrijos_pavadinimas")
                  .IsRequired();
        }
        
    }
}