import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    username: string;
    role: string;
  };
}

export interface QueryParams {
  page?: string;
  limit?: string;
  sort?: string;
  filter?: string;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
