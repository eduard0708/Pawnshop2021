

export interface AddPawner {
  firstName: string;
  lastName: string;
  contactNumber: number;
  addresses:PawnerAddress[];
  dateCreated?: string;
  dateUpdated?: string;
  employeeId: number;
  isActive:boolean;
}
