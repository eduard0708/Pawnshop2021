import { Address } from "./address";

export interface NewTrasactionPawner {
    pawnerId:number;
    trackingId?:number;
    firstName:string;
    lastName:string;
    contactNumber:string;
    city:string;
    barangay:string;
    completeAddress:string;
}
