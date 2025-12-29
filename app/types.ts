import dayjs from "dayjs";

export interface Customer {
  id: number;
  title?: string;
  firstname: string;
  lastname: string;
  phone?: string;
  email?: string;
}

export interface Pagination {
   skip: number; 
   itemsPerPage: number;
   totalCount: number;
   currentPage: number; 
   totalPages: number;
}

export interface OperationResult {
  success: boolean;
  error?: string | null;
}

// --- Types ---
export type Role = 'ADMIN' | 'REPAIRER' | 'GUEST';

export interface User {
  id?: number;
  email: string;
  roles: Role[];
}
