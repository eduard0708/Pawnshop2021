﻿namespace PawnshopAPI.Entities
{
    public class Barangay
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CityId { get; set; }
        public City Cities { get; set; }

    }
}