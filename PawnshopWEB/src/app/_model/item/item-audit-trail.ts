export interface ItemAuditTrail{
  itemAuditTrailId:number;
  actionBy:number; //employee id
  dateOn:string; // date action or modified
  itemStatus:string; //auction sold damage missing recycled pawned
  remarks?:string
}
