export interface ApiResponse<T> {
  data: T | T[] | null;
  success: boolean;
  message: string;
}
