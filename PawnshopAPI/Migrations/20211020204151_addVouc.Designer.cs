// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PawnshopAPI.Data;

namespace PawnshopAPI.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20211020204151_addVouc")]
    partial class addVouc
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PawnshopAPI.Entities.Address", b =>
                {
                    b.Property<int>("AddressId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BarangayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CityName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompleteAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<int>("PawnerId")
                        .HasColumnType("int");

                    b.HasKey("AddressId");

                    b.HasIndex("PawnerId");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Barangay", b =>
                {
                    b.Property<int>("BarangayId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BarangayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CityId")
                        .HasColumnType("int");

                    b.HasKey("BarangayId");

                    b.HasIndex("CityId");

                    b.ToTable("Barangays");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.CategoryDescription", b =>
                {
                    b.Property<int>("CategoryDescriptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryDescriptionName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.HasKey("CategoryDescriptionId");

                    b.HasIndex("CategoryId");

                    b.ToTable("CategoryDescriptions");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.City", b =>
                {
                    b.Property<int>("CityId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CityName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CityId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.ItemAuditTrail", b =>
                {
                    b.Property<int>("ItemAuditTrailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ActionBy")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("ItemStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Remarks")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TransactionItemsId")
                        .HasColumnType("int");

                    b.HasKey("ItemAuditTrailId");

                    b.HasIndex("TransactionItemsId");

                    b.ToTable("ItemAuditTrail");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Pawner", b =>
                {
                    b.Property<int>("PawnerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ContactNumber")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateUpdated")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PawnerId");

                    b.ToTable("Pawners");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.TransactionItem", b =>
                {
                    b.Property<int>("TransactionItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("AppraisalValue")
                        .HasColumnType("float");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CategoryDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DateSold")
                        .HasColumnType("datetime2");

                    b.Property<string>("ItemDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("NewDateTransaction")
                        .HasColumnType("datetime2");

                    b.Property<int>("PreviousTransactionId")
                        .HasColumnType("int");

                    b.Property<double>("SellingPrice")
                        .HasColumnType("float");

                    b.Property<int>("TrackingId")
                        .HasColumnType("int");

                    b.Property<int>("TransactionId")
                        .HasColumnType("int");

                    b.Property<int?>("TransactionsId")
                        .HasColumnType("int");

                    b.Property<bool>("isSold")
                        .HasColumnType("bit");

                    b.HasKey("TransactionItemId");

                    b.HasIndex("TransactionsId");

                    b.ToTable("TransactionItems");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.TransactionPawner", b =>
                {
                    b.Property<int>("TransactionPawnerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Barangay")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CompleteAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ContactNumber")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PawnerId")
                        .HasColumnType("int");

                    b.Property<int>("TrackingId")
                        .HasColumnType("int");

                    b.Property<int>("TransactionsId")
                        .HasColumnType("int");

                    b.HasKey("TransactionPawnerId");

                    b.HasIndex("TransactionsId")
                        .IsUnique();

                    b.ToTable("TransactionPawners");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Transactions", b =>
                {
                    b.Property<int>("TransactionsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("AdditionalAmount")
                        .HasColumnType("float");

                    b.Property<double>("AdvanceInterest")
                        .HasColumnType("float");

                    b.Property<double>("AdvanceServiceCharge")
                        .HasColumnType("float");

                    b.Property<double>("AvaillableAmount")
                        .HasColumnType("float");

                    b.Property<double>("Change")
                        .HasColumnType("float");

                    b.Property<DateTime?>("DateExpired")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateGranted")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateMatured")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateTransaction")
                        .HasColumnType("datetime2");

                    b.Property<double>("Discount")
                        .HasColumnType("float");

                    b.Property<double>("DueAmount")
                        .HasColumnType("float");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<double>("Interest")
                        .HasColumnType("float");

                    b.Property<double>("InterestRate")
                        .HasColumnType("float");

                    b.Property<string>("LoanStatus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Moments")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("NetPayment")
                        .HasColumnType("float");

                    b.Property<double>("NetProceed")
                        .HasColumnType("float");

                    b.Property<double>("NewPrincipalLoan")
                        .HasColumnType("float");

                    b.Property<double>("PartialAmount")
                        .HasColumnType("float");

                    b.Property<double>("Penalty")
                        .HasColumnType("float");

                    b.Property<double>("PrincipalLoan")
                        .HasColumnType("float");

                    b.Property<double>("ReceivedAmount")
                        .HasColumnType("float");

                    b.Property<double>("RedeemAmount")
                        .HasColumnType("float");

                    b.Property<double>("ServiceCharge")
                        .HasColumnType("float");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("TotalAppraisal")
                        .HasColumnType("float");

                    b.Property<int>("TrackingId")
                        .HasColumnType("int");

                    b.Property<string>("TransactionType")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TransactionsId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Voucher", b =>
                {
                    b.Property<int>("VoucherId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Amount")
                        .HasColumnType("float");

                    b.Property<string>("CashCheque")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateEntry")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("Remarks")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("VoucherId");

                    b.ToTable("Vouchers");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.VoucherCode", b =>
                {
                    b.Property<int>("VoucherCodeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CodeName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("VoucherCodeId");

                    b.ToTable("VoucherCodes");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.VoucherType", b =>
                {
                    b.Property<int>("VoucherTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("TypeName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("VoucherTypeId");

                    b.ToTable("VoucherTypes");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Address", b =>
                {
                    b.HasOne("PawnshopAPI.Entities.Pawner", "Pawner")
                        .WithMany("Addresses")
                        .HasForeignKey("PawnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Pawner");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Barangay", b =>
                {
                    b.HasOne("PawnshopAPI.Entities.City", "Cities")
                        .WithMany("Barangays")
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cities");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.CategoryDescription", b =>
                {
                    b.HasOne("PawnshopAPI.Entities.Category", "Categories")
                        .WithMany("CategoryDescriptions")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Categories");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.ItemAuditTrail", b =>
                {
                    b.HasOne("PawnshopAPI.Entities.TransactionItem", "TransactionItems")
                        .WithMany("ItemAuditTrails")
                        .HasForeignKey("TransactionItemsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TransactionItems");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.TransactionItem", b =>
                {
                    b.HasOne("PawnshopAPI.Entities.Transactions", "Transactions")
                        .WithMany("TransactionItems")
                        .HasForeignKey("TransactionsId");

                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.TransactionPawner", b =>
                {
                    b.HasOne("PawnshopAPI.Entities.Transactions", "Transactions")
                        .WithOne("TransactionPawner")
                        .HasForeignKey("PawnshopAPI.Entities.TransactionPawner", "TransactionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Category", b =>
                {
                    b.Navigation("CategoryDescriptions");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.City", b =>
                {
                    b.Navigation("Barangays");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Pawner", b =>
                {
                    b.Navigation("Addresses");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.TransactionItem", b =>
                {
                    b.Navigation("ItemAuditTrails");
                });

            modelBuilder.Entity("PawnshopAPI.Entities.Transactions", b =>
                {
                    b.Navigation("TransactionItems");

                    b.Navigation("TransactionPawner");
                });
#pragma warning restore 612, 618
        }
    }
}
