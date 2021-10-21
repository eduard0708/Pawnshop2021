using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class DashBoardData
    {
        public DashBoardData(string name ="", int count=0, double sum=0, string icon="")
        {
            Name = name;
            Count = count;
            Sum = sum;
            Icon = icon;
        }

        public string Name { get; set; }
        public int Count { get; set; }
        public double Sum { get; set; }
        public string Icon { get; set; }
    }
}
