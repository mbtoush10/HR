export interface Department {
  id: number;
  name: string;
  description?: string | null;
  floorNumber: number;
  typeId: number;
  typeName?: string;
}