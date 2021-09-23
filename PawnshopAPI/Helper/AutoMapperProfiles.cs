using AutoMapper;
using PawnshopAPI.DTO;
using PawnshopAPI.DTO.AddressDTO;
using PawnshopAPI.DTO.PawnerDTO;
using PawnshopAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Pawner Mappings
            CreateMap<Pawner, PawnerDto>().ReverseMap();
            CreateMap<Pawner, ReturnPawnerDto>().ReverseMap();

            //Address Mappings
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<City, ReturnCityDto>();
            CreateMap<Barangay, ReturnBarangayDto>();
            CreateMap<AddCityDto, City>();
            CreateMap<AddBarangayDto, Barangay>();
            CreateMap<Barangay, BarangayDto>();
            CreateMap<City, ListCityDto>();

            //Items Mappings
            CreateMap<Category, ListCategoryDto>();
            CreateMap<AddCategoryDto, Category>();
            CreateMap<AddCategoryDto, Category>();
            CreateMap<AddCategoryDescriptionDto, CategoryDescription>();
        }
    }
}
