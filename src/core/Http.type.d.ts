export interface HttpBaseResponse<T> {
  data: T;
  message?: string;
  error?: any;
}
