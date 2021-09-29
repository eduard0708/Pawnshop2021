import { Address } from "../address/address";

export interface Pawner {
    pawnerId:number;
    firstName:string;
    lastName:string;
    contactNumber:string;
    city:string;
    barangay:string;
    addresses:Address[];
}
