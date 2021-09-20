using AutoMapper;
using PawnshopAPI.DTO;
using PawnshopAPI.DTO.AddressDTO;
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
            CreateMap<AddCityDto, City>();
            CreateMap<AddBarangayDto, Barangay>();
            CreateMap<Barangay, BarangayDto>();
            CreateMap<City, ListCityDto>();
   
            CreateMap<Pawner, PawnerDto>().ReverseMap();
            CreateMap<Address, AddressDto>().ReverseMap();

            //Address Mappings
            CreateMap<City, ReturnCityDto>();
          
            //Items Mappings
            CreateMap<Category, ListCategoryDto>();
            CreateMap<AddCategoryDto, Category>();
            CreateMap<AddCategoryDto, Category>();
            CreateMap<AddCategoryDescriptionDto, CategoryDescription>();
        }
    }
}
