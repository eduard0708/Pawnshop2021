using AutoMapper;
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
using System.Transactions;
using PawnshopAPI.Helper;
using static PawnshopAPI.Helper.TransactionEnums;

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
        public ActionResult<AddTransactionDto> Newloan(AddTransactionDto newTransaction)
        {
            var transaction = mapper.Map<Transactions>(newTransaction);
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


        [HttpPost("addtransaction")]
        public async Task<ActionResult<AddTransactionDto>> AddTransaction(AddTransactionDto addTransaction)
        {
            
            var PreviousTransaction = await context.Transactions
                .FirstOrDefaultAsync(t => t.TransactionsId == addTransaction.PreviousTransactionId);
            if (PreviousTransaction == null)
                return NotFound();

            
            var transaction = mapper.Map<Transactions>(addTransaction);
            PreviousTransaction.Status = "Closed";
            context.Update(PreviousTransaction);
            context.Transactions.Add(transaction);
            await context.SaveChangesAsync();

            var trans = mapper.Map<AddTransactionDto>(transaction);

            return Ok(trans);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReturnTransactionsDto>> GetTransactionById(int id)
        {
            var transaction = await context.Transactions
                 .FirstOrDefaultAsync(x => x.TransactionsId == id);
            if (transaction == null)
            {
                var CustomErrorStatus = new
                {
                    ErrorId = 404,
                    ErrorCode = "NotFound",
                    Message = $"Transaction number: {id} not exist!"
                };
                return NotFound(CustomErrorStatus);
            }
            else
            {

                var pawner = context.TransactionPawners.FirstOrDefault(p => p.TrackingId == transaction.TrackingId);
                transaction.TransactionPawner = pawner;
                var returnedTransaction = mapper.Map<ReturnTransactionsDto>(transaction);

                return Ok(returnedTransaction);

            }
        }

    }
}
