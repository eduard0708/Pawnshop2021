﻿// <auto-generated />
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
    [Migration("20210924123222_initCreatenew")]
    partial class initCreatenew
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

            modelBuilder.Entity("PawnshopAPI.Entities.Pawner", b =>
                {
                    b.Property<int>("PawnerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ContactNumber")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PawnerId");

                    b.ToTable("Pawners");
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
#pragma warning restore 612, 618
        }
    }
}
