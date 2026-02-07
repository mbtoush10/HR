export interface Employee {
  id            : number;
  name          : string;
  positionId    ?: number;
  positionName  ?: string;
  birthDate     ?: Date;
  isActive      : boolean;
  startDate     :  Date;
  phone         ?: string;
  managerId     ?: number | null; // Accept Multiple Data types
  managerName   ?: string | null; // Accept Multiple Data types
  departmentId  ?: number;
  departmentName?: string;
  image         ?: any;
  imagePath     ?: string;
  isImage       ?: boolean; // Check if Image Path is Empty
}