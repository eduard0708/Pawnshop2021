using Microsoft.EntityFrameworkCore.Migrations;

namespace PawnshopAPI.Migrations
{
    public partial class updateworngfieldname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "netProceed",
                table: "Transactions",
                newName: "NetProceed");

            migrationBuilder.RenameColumn(
                name: "PeceiveAmount",
                table: "Transactions",
                newName: "ReceiveAmount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NetProceed",
                table: "Transactions",
                newName: "netProceed");

            migrationBuilder.RenameColumn(
                name: "ReceiveAmount",
                table: "Transactions",
                newName: "PeceiveAmount");
        }
    }
}
