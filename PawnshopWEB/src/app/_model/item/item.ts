import { ItemAuditTrail } from './item-audit-trail';

export interface Item {
  itemId: number;
  categoryId:number;
  category: string;
  categoryDescription: string;
  description: string;
  appraisalValue: number;  
}
