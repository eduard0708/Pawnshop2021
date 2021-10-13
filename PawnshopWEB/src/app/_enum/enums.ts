export enum TrasactionType {
  Newloan = 'Newloan',
  Redeem = 'Redeem',
  Partial = 'Partial',
  Additional = 'Additional',
  Renew = 'Renew',
}

export enum TransactionStatus {
  Active = 'Active',
  Closed = 'Closed',
  Cancelled = 'Cancelled',
}

export enum LoanStatus {
  Premature = 'Premature',
  Matured = 'Matured',
  Expired = 'Expired',
  New = 'New',
}

export enum ItemStatus {
  Pawned = 'Pawned',
  Auction = 'Auction',
  Sold = 'Sold',
  Damage = 'Damage',
  Missing = 'Missing',
  Recycled = 'Recycled',
}

export enum VoucherType {
  Expense = 'Expense',
  CashBeginning = 'Cash Beginning',
  CashTransferIn = 'Cash Transfer In',
  CashTransferOut = 'Cash Transfer Out',
}
