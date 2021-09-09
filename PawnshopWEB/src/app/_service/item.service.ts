import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../_model/item';
import { Select } from '../_model/select';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  uri = 'http://localhost:3000/';

  items$: BehaviorSubject<Item[]>;
  items: Array<Item> =[];

  constructor(private http: HttpClient) {
    this.items$ = new BehaviorSubject([]);
    this.items = [];   
   }

   add(item:Item){
    this.items.push(item)
    this.items$.next(this.items);
   }

   edit(item:Item){
    let findElem = this.items.find(p => p.id == item.id);
    findElem.appraisalValue = item.appraisalValue;
    findElem.category = item.category;
    findElem.categoryDescription = item.categoryDescription;
    findElem.description = item.description;
    this.items$.next(this.items);
   }

   delete(id:number){
    this.items = this.items.filter(p => {
      return p.id != id
    });
    this.items$.next(this.items);
   }

  getCategory(){
    return this.http.get<Select[]>(this.uri + 'category');
  }

  getCategoryDescription(){
   return this.http.get<Select[]>(this.uri + 'categoryDescription');
  }



}
