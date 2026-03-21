// API Response types to replace shared module
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}