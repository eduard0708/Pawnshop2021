using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Entities
{
    public class DashBoardData
    {
        public DashBoardData(string name =null, int count=0, double sum=0)
        {
            Name = name;
            Count = count;
            Sum = sum;
        }

        public string Name { get; set; }
        public int Count { get; set; }
        public double Sum { get; set; }
    }
}
