import { ItemAuditTrail } from "./ItemAuditTrail";

export interface Item{
    itemId:number;
    trackingId:number;
    category:string;
    categoryDescription:string;
    description:string;
    appraisalValue:number;
    itemStatus:string;
    sellingPrice?:number;
    isSold:boolean;
    itemAuditTrail:ItemAuditTrail[];
}