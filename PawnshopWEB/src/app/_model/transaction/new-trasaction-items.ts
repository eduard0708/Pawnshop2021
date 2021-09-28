import { ItemAuditTrail } from "../item/ItemAuditTrail";

export interface NewTransactionItems{
    trackingId?:number;
    category:string;
    categoryDescription:string;
    itemDescription:string
    appraisalValue:number;
    sellingPrice?:number;
    isSold:boolean;
    dateSold:string;
    itemAuditTrail:ItemAuditTrail[]
}