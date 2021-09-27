import { PawnerAddress } from "./PawnerAddress";

export interface Pawner {
    id:number;
    firstName:string;
    lastName:string;
    contactNumber:string;
    city:string;
    barangay:string;
    addresses:PawnerAddress[];
}
