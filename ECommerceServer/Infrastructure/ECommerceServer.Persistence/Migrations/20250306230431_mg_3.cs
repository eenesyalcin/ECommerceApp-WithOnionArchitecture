using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerceServer.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mg_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Storage",
                table: "FileTables",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Storage",
                table: "FileTables");
        }
    }
}
