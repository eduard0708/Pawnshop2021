using AutoMapper;
using PawnshopAPI.DTO;
using PawnshopAPI.DTO.AddressDTO;
using PawnshopAPI.DTO.ItemDTO;
using PawnshopAPI.DTO.PawnerDTO;
using PawnshopAPI.DTO.TransactionDTO;
using PawnshopAPI.DTO.VoucherDTO;
using PawnshopAPI.Entities;


namespace PawnshopAPI.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Pawner Mappings
            CreateMap<Pawner, PawnerDto>().ReverseMap();
            CreateMap<Pawner, ReturnPawnerDto>().ReverseMap();
            CreateMap<Pawner, ReturnPawnerFindByContactNumber>().ReverseMap();

            //Voucher
            CreateMap<VoucherType, VocherTypeDto>().ReverseMap();
            CreateMap<VoucherCode, VoucherCodeDto>().ReverseMap();

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

            //CreateMap<AddCategoryDto, Category>();
            CreateMap<AddCategoryDescriptionDto, CategoryDescription>();
            CreateMap<Category, CategoryWithDescriptionDto>();
            CreateMap<Category, CategoryDescriptionDto>();

            //Transactions mapping
            CreateMap<AddTransactionDto, Transactions>().ReverseMap();
            CreateMap<AddTransactionPawnerDto, TransactionPawner>().ReverseMap();
            CreateMap<AddTransactionItemDto, TransactionItem>().ReverseMap();
            CreateMap<AddItemAuditTrailDto, ItemAuditTrail>().ReverseMap();

            CreateMap<ReturnTransactionsDto, Transactions>().ReverseMap();
            CreateMap<ReturnTransactionPawner, TransactionPawner>().ReverseMap();
            CreateMap<ReturnTransactionItems, TransactionItem>().ReverseMap();

            
        }
    }
}
