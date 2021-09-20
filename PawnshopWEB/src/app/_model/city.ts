import { Barangay } from "./barangay";

export interface City{
    cityId:number;
    cityName:string;
    barangay:Barangay[]
 }