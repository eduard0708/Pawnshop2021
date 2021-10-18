import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCategoryDescription } from '../_model/item/AddCategoryDescription';
import { Category } from '../_model/item/category';
import { CategoryDescription } from '../_model/item/CategoryDescription';
import { Item } from '../_model/item/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  jsonUrl = 'http://localhost:3000/';
  baseUrl: string = 'http://localhost:5000/';

  apiUrl = environment.baseUrl + 'item/';

  items$: BehaviorSubject<Item[]>;
  items: Array<Item> = [];

  constructor(private http: HttpClient) {
    this.items$ = new BehaviorSubject([]);
    this.items = [];
  }

  addCategoryDescription(categoryDescription: AddCategoryDescription) {
    return this.http.post(this.apiUrl + 'add-category-description', categoryDescription);
  }

  getCategories() {
    return this.http.get<Category[]>(this.apiUrl + 'category')
  }

  getCategoryDescriptionById(id:number){
    return this.http.get<CategoryDescription[]>(this.apiUrl + `${id}`)
  }

  addCategory(category){
    return this.http.post(this.apiUrl + 'add-category',category)
  }

  add(item: Item) {
    this.items.push(item);
    this.items$.next(this.items);
  }

  clear() {
    this.items = [];
    this.items$.next(this.items);
  }

  edit(item: Item) {
    // let findElem = this.items.find(p => p.id == item.id);
    // findElem.appraisalValue = item.appraisalValue;
    // findElem.category = item.category;
    // findElem.categoryDescription = item.categoryDescription;
    // findElem.description = item.description;
    // this.items$.next(this.items);
  }

  delete(id: number) {
    this.items = this.items.filter((item) => {
      return item.itemId != id;
    });
    this.items$.next(this.items);
  }

}
