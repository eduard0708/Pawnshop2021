using AutoMapper;
using PawnshopAPI.DTO;
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
            CreateMap<PawnerDto, Pawner>().ReverseMap();
            CreateMap<AddressDto, Address>().ReverseMap();

        }
    }
}
