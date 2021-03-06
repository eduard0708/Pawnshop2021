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
            //search previous transaction to mark it close
            var PreviousTransaction = await context.Transactions
                .FirstOrDefaultAsync(t => t.TransactionsId == addTransaction.PreviousTransactionId);
            if (PreviousTransaction == null)
                return NotFound();

            var transaction = mapper.Map<Transactions>(addTransaction);
            //mark closed the previous transaction and update
            PreviousTransaction.Status = "Closed";
            context.Update(PreviousTransaction);

            await context.Transactions.AddAsync(transaction);
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
                var pawner = await context.TransactionPawners.FirstOrDefaultAsync(p => p.TrackingId == transaction.TrackingId);
                var items = await context.TransactionItems.Where(p => p.TrackingId == transaction.TrackingId).ToListAsync();
                transaction.TransactionPawner = pawner;
                transaction.TransactionItems = items;
                var returnedTransaction = mapper.Map<ReturnTransactionsDto>(transaction);
                return Ok(returnedTransaction);
            }
        }

        /*get all transaction as per request from the dashboard card for view list of transaction  */
        [HttpGet("view-list-transaction/{trasactionType}")]
        public async Task<ActionResult<IEnumerable<ReturnTransactionsDto>>> GetTransactionById(string trasactionType)
        {
            var transaction = await context.Transactions
                 .Where(x => x.TransactionType == trasactionType && x.DateTransaction.Date == DateTime.Today.Date )
                 .Include(p => p.TransactionPawner)
                 .ToListAsync();
            if (transaction == null)
            {
                var CustomErrorStatus = new
                {
                    ErrorId = 404,
                    ErrorCode = "NotFound",
                    Message = $"Transaction Type: {trasactionType} not exist!"
                };
                return NotFound(CustomErrorStatus);
            }
            else
            {
                var rt = mapper.Map<List<ReturnTransactionsDto>>(transaction);
                List<ListViewTransaction> _listTrans = new List<ListViewTransaction>();

                for (int i = 0; i < rt.Count(); i++)
                {
                    var p = context.TransactionPawners.FirstOrDefault(x => x.TrackingId == rt[i].TrackingId);

                    ListViewTransaction lt = new ListViewTransaction
                    {
                        TransactionId = rt[i].TransactionsId,
                        TransactionType = rt[i].TransactionType,
                        LoanStatus = rt[i].Status,
                        DateTransaction = rt[i].DateTransaction,
                        FirstName = p.FirstName,
                        LastName = p.LastName
                    };
                    _listTrans.Add(lt);

                }
               
                return Ok(_listTrans);
            }
     
    }

}
}
