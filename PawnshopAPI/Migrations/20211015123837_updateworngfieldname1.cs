using Microsoft.EntityFrameworkCore.Migrations;

namespace PawnshopAPI.Migrations
{
    public partial class updateworngfieldname1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReceiveAmount",
                table: "Transactions",
                newName: "ReceivedAmount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReceivedAmount",
                table: "Transactions",
                newName: "ReceiveAmount");
        }
    }
}
