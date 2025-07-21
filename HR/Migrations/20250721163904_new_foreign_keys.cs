using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HR.Migrations
{
    /// <inheritdoc />
    public partial class new_foreign_keys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Vacations_EmployeeId",
                table: "Vacations",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Vacations_TypeId",
                table: "Vacations",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vacations_Employees_EmployeeId",
                table: "Vacations",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vacations_LookUps_TypeId",
                table: "Vacations",
                column: "TypeId",
                principalTable: "LookUps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacations_Employees_EmployeeId",
                table: "Vacations");

            migrationBuilder.DropForeignKey(
                name: "FK_Vacations_LookUps_TypeId",
                table: "Vacations");

            migrationBuilder.DropIndex(
                name: "IX_Vacations_EmployeeId",
                table: "Vacations");

            migrationBuilder.DropIndex(
                name: "IX_Vacations_TypeId",
                table: "Vacations");
        }
    }
}
