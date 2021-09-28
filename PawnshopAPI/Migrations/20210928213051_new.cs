using Microsoft.EntityFrameworkCore.Migrations;

namespace PawnshopAPI.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "_Items");

            migrationBuilder.DropTable(
                name: "_Transactions");

            migrationBuilder.DropTable(
                name: "_Pawners");

            migrationBuilder.CreateTable(
                name: "Trans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TN = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Iteems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TN = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TransId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Iteems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Iteems_Trans_TransId",
                        column: x => x.TransId,
                        principalTable: "Trans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pawns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TN = table.Column<int>(type: "int", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TransId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pawns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pawns_Trans_TransId",
                        column: x => x.TransId,
                        principalTable: "Trans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Iteems_TransId",
                table: "Iteems",
                column: "TransId");

            migrationBuilder.CreateIndex(
                name: "IX_Pawns_TransId",
                table: "Pawns",
                column: "TransId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Iteems");

            migrationBuilder.DropTable(
                name: "Pawns");

            migrationBuilder.DropTable(
                name: "Trans");

            migrationBuilder.CreateTable(
                name: "_Pawners",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TN = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Pawners", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_Transactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TN = table.Column<int>(type: "int", nullable: false),
                    _PawnerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Transactions__Pawners__PawnerId",
                        column: x => x._PawnerId,
                        principalTable: "_Pawners",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "_Items",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TN = table.Column<int>(type: "int", nullable: false),
                    _TransactionId = table.Column<int>(type: "int", nullable: true),
                    _transacitonId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Items__Transactions__TransactionId",
                        column: x => x._TransactionId,
                        principalTable: "_Transactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX__Items__TransactionId",
                table: "_Items",
                column: "_TransactionId");

            migrationBuilder.CreateIndex(
                name: "IX__Transactions__PawnerId",
                table: "_Transactions",
                column: "_PawnerId");
        }
    }
}
