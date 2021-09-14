import { Barangay } from "./barangay";

export interface City{
    id:number;
    name:string;
    barangay:Barangay[]
 }