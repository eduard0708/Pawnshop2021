import { Barangay } from "./barangay";

export interface City{
    cityId:number;
    cityName:string;
    barangays:Barangay[]
 }