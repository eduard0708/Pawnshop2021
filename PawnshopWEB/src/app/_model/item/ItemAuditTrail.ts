export interface ItemAuditTrail{
    itemAuditTrailId:number;
    actionBy:number;
    dateOn:Date;
    itemStatus:string;
    remarks?:string
}