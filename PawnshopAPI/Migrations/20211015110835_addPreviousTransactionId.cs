using Microsoft.EntityFrameworkCore.Migrations;

namespace PawnshopAPI.Migrations
{
    public partial class addPreviousTransactionId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PreviousTransactionId",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreviousTransactionId",
                table: "Transactions");
        }
    }
}
