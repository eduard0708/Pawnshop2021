export interface PawnerAddress{
    isActive:boolean; 
    cityName:string;
    barangayName:string;
    addresses:Address[];
    dateCreated?:string;
    dateUpdated?:string;
    employeeId:number;
}