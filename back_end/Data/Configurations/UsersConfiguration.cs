using back_end.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace back_end.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<Users>
    {
            public void Configure(EntityTypeBuilder<Users> entity)
            {
                  entity.ToTable("vartotojai");

                  entity.HasKey(u => u.Id);

                  entity.Property<string>("_name")
                        .HasColumnName("vardas")
                        .IsRequired();

                  entity.Property<string>("_lastName")
                        .HasColumnName("pavarde")
                        .IsRequired();

                  entity.Property(e => e.PasswordHash)
                        .HasField("_passwordHash")
                        .HasColumnName("slaptazodzio_hash")
                        .IsRequired();

                  entity.Property(e => e.UserName)
                        .HasField("_userName")
                        .HasColumnName("vartotojas")
                        .IsRequired();

                  entity.Property<string>("_gender")
                        .HasColumnName("lytis")
                        .IsRequired();

                  entity.Property<int>("_group")
                        .HasColumnName("bendrijos_id")
                        .IsRequired();

                  entity.Property<int>("_role")
                        .HasColumnName("roles_id") 
                        .IsRequired();
        }
    }
}
