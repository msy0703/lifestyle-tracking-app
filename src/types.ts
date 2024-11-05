export interface Activity {
  id: number;
  type: string;
  timestamp: number;
  tirednessLevel?: number;
  purpose?: string;
  note?: string;
}