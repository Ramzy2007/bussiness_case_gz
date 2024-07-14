import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Packages {
  items: Package[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Location{
    lat: number,
    lng: number
}

export interface Package {
  id_?: string;
  description: string,
  weight: number,
  width: number,
  height: number,
  depth: number,
  from_name: string,
  from_address: string,
  to_name: string,
  to_address: string,
  from_location: Location,
  to_location: Location,
  createdAt: string,
  updatedAt: string
}

export interface ApiResponse{
    status: number,
    message: string,
    data?: Package | Package[]
}

export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}