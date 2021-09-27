import { CategoryDescription } from "./CategoryDescription";

export interface Category{
    categoryId?:number;
    categoryName?:string
    categoryDescriptions?:CategoryDescription[]
}