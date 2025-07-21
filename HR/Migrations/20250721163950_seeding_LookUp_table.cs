using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HR.Migrations
{
    /// <inheritdoc />
    public partial class seeding_LookUp_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "LookUps",
                columns: new[] { "Id", "MajorCode", "MinorCode", "Name" },
                values: new object[,]
                {
                    { 9L, 2, 0, "Vacation Types" },
                    { 10L, 2, 1, "Annual Vacation" },
                    { 11L, 2, 2, "Sick Vacation" },
                    { 12L, 2, 3, "Unpaid Vacation" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "LookUps",
                keyColumn: "Id",
                keyValue: 9L);

            migrationBuilder.DeleteData(
                table: "LookUps",
                keyColumn: "Id",
                keyValue: 10L);

            migrationBuilder.DeleteData(
                table: "LookUps",
                keyColumn: "Id",
                keyValue: 11L);

            migrationBuilder.DeleteData(
                table: "LookUps",
                keyColumn: "Id",
                keyValue: 12L);
        }
    }
}
