import { Address } from "../address/address";


export interface AddPawner {
  firstName: string;
  lastName: string;
  contactNumber: number;
  addresses:Address[];
  dateCreated?: string;
  dateUpdated?: string;
  employeeId: number;
  isActive:boolean;
}
