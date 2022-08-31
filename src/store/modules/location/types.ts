export interface IInitialStateDTO {
  locationLoading: boolean;
  lat?: number;
  long?: number;
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
