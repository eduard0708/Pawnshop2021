using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PawnshopAPI.Data;
using PawnshopAPI.DTO.TestDTO;
using PawnshopAPI.DTO.TransactionDTO;
using PawnshopAPI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace PawnshopAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public TransactionController(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public ActionResult<AddTransactionDto> Newloan(AddTransactionDto transactions) {

            var transaction = mapper.Map<Transactions>(transactions);
            context.Transactions.Add(transaction);
            context.SaveChanges();

            var transactionId = transaction.TransactionsId;
            transaction.TransactionPawner.TrackingId = transactionId;
            transaction.TrackingId = transactionId;

            foreach (var item in transaction.TransactionItems)
            {
                item.TrackingId = transactionId;
            }

            context.Update(transaction);
            context.SaveChanges();

            var trans = mapper.Map<AddTransactionDto>(transaction);

            return Ok(trans);
        }

        [HttpGet("{id}")]
<<<<<<< HEAD
        public ActionResult<ReturnTransactionsDto> GetTransactionById(int id) {
=======
        public ActionResult<ReturnTransactionDto> GetTransactionById(int id) {
>>>>>>> 877348fb0c39b97839ae4a200ca1301fc16fc49f

            var t = context.Transactions
                 .Include(x => x.TransactionPawner)
                 .Include(x => x.TransactionItems)
                 .FirstOrDefault(x => x.TransactionsId == id);
                  
<<<<<<< HEAD
            var transaction = mapper.Map<ReturnTransactionsDto>(t);
=======
            var transaction = mapper.Map<ReturnTransactionDto>(t);
>>>>>>> 877348fb0c39b97839ae4a200ca1301fc16fc49f

            return Ok(transaction);
        }

    }
}
