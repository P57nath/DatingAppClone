using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFieldsToAppUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Interests",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Introduction",
                table: "Users",
                newName: "UserEmail");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserEmail",
                table: "Users",
                newName: "Introduction");

            migrationBuilder.AddColumn<string>(
                name: "Interests",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
