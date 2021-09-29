import { ItemAuditTrail } from "../item/ItemAuditTrail";

export interface NewTransactionItems{
    previousTransactionId:number;
    trackingId?:number;
    category:string;
    categoryDescription:string;
    itemDescription:string
    appraisalValue:number;
    sellingPrice?:number;
    isSold:boolean;
    dateSold:string;
    monitoringDateTransacton:string;
    itemAuditTrail:ItemAuditTrail[]
}