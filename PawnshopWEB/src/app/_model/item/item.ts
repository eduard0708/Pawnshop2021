import { ItemAuditTrail } from './item-audit-trail';

export interface Item {
  itemId: number;
  trackingId: number;
  category: string;
  categoryDescription: string;
  description: string;
  appraisalValue: number;
  itemStatus: string;
  sellingPrice?: number;
  isSold: boolean;
  //dateExpire will be updated for renew and parial transaction
  dateExpire?: string;
  itemAuditTrail: ItemAuditTrail[];
}
