using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class AddJoinTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroupService",
                columns: table => new
                {
                    GroupsId = table.Column<int>(type: "int", nullable: false),
                    ServicesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupService", x => new { x.GroupsId, x.ServicesId });
                    table.ForeignKey(
                        name: "FK_GroupService_bendrijos_GroupsId",
                        column: x => x.GroupsId,
                        principalTable: "bendrijos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupService_paslaugos_ServicesId",
                        column: x => x.ServicesId,
                        principalTable: "paslaugos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RoleRight",
                columns: table => new
                {
                    RightsId = table.Column<int>(type: "int", nullable: false),
                    RolesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleRight", x => new { x.RightsId, x.RolesId });
                    table.ForeignKey(
                        name: "FK_RoleRight_roles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleRight_teises_RightsId",
                        column: x => x.RightsId,
                        principalTable: "teises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupService_ServicesId",
                table: "GroupService",
                column: "ServicesId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleRight_RolesId",
                table: "RoleRight",
                column: "RolesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupService");

            migrationBuilder.DropTable(
                name: "RoleRight");
        }
    }
}
