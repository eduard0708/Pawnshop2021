import { ItemAuditTrail } from "../item/item-audit-trail";

export interface TransactionItems{
    itemId:number;
    previousTransactionId:number;
    trackingId:number;
    category:string;
    categoryDescription:string;
    // itemDescription:string
    description:string
    appraisalValue:number;
    sellingPrice:number;
    isSold:boolean;
    dateSold?:string;
    newDateTransaction:string; //insert new date of new transaction to update the date expire
    itemAuditTrails:ItemAuditTrail[];
}
