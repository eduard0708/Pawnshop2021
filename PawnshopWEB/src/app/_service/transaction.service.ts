import { Injectable } from '@angular/core';
import { Item } from '../_model/item/item';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

   /* normalize items from transaction to assigned in table */
   normalizeItemsForTable(items) {
    let normItem: Item[] = [];
    for (let index = 0; index < items.length; index++) {
      const i = items[index];
      let nItem: Item = {
        itemId: i.itemId,
        categoryId: 0,
        category: i.category,
        categoryDescription: i.categoryDescription,
        description: i.categoryDescription,
        appraisalValue: i.appraisalValue,
      };
      normItem.push(nItem);
    }
    return normItem;
  }
}
