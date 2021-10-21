using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Data;
using PawnshopAPI.DTO.TransactionDTO;
using PawnshopAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PawnshopAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DashBoardController : ControllerBase
    {
        private readonly DataContext context;

        public DashBoardController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult> GetDataDashBoard()
        {
            var today = DateTime.Today.Date;
            var todayTransactionsList = await context.Transactions.Where(x => x.DateTransaction.Date == today).ToListAsync();
            var newloan = todayTransactionsList.Where(x => x.TransactionType == "Newloan").ToList();
            var redeem = todayTransactionsList.Where(x => x.TransactionType == "Redeem").ToList();
            var partial = todayTransactionsList.Where(x => x.TransactionType == "Partial").ToList();
            var additional = todayTransactionsList.Where(x => x.TransactionType == "Additional").ToList();
            var renew = todayTransactionsList.Where(x => x.TransactionType == "Renew").ToList();

            var newloanSum = todayTransactionsList.Where(x => x.TransactionType == "Additional").Sum(netProceed => netProceed.NetProceed);
            var newloanCount = additional.Count();

            var r = new
            {
                name = "Additional",
                count = newloanCount,
                sum = newloanSum
            };

            List<DashBoardData> data = new List<DashBoardData>();
            data.Add(new DashBoardData("Newloan", 0, 0, "note_add"));
            data.Add(new DashBoardData("Redeem", 0, 0, "summarize"));
            data.Add(new DashBoardData("Partial", 0, 0, "note_alt"));
            data.Add(new DashBoardData("Additional", 0, 0, "post_add"));
            data.Add(new DashBoardData("Renew", 0, 0, "task"));

            for (int i = 0; i < data.Count; i++)
            {
                if (data[i].Name == "Partial")
                {
                    data[i].Sum = todayTransactionsList.Where(x => x.TransactionType == data[i].Name).Sum(netProceed => netProceed.PartialAmount);
                    data[i].Count = todayTransactionsList.Where(x => x.TransactionType == data[i].Name).Count();
                }
                else
                if (data[i].Name == "Redeem")
                {
                    data[i].Sum = todayTransactionsList.Where(x => x.TransactionType == data[i].Name).Sum(netProceed => netProceed.RedeemAmount);
                    data[i].Count = todayTransactionsList.Where(x => x.TransactionType == data[i].Name).Count();
                }
                else
                if (data[i].Name == "Renew")
                {
                    data[i].Sum = todayTransactionsList.Where(x => x.TransactionType == data[i].Name).Sum(netProceed => netProceed.NetPayment);
                    data[i].Count = todayTransactionsList.Where(x => x.TransactionType == data[i].Name).Count();
                }
                else
                {
                    data[i].Sum = todayTransactionsList.Where(x => x.TransactionType == data[i].Name).Sum(netProceed => netProceed.NetProceed);
                    data[i].Count = todayTransactionsList.Where(x => x.TransactionType == data[i].Name).Count();
                }

            }
            return Ok(data);
        }

    }
}
