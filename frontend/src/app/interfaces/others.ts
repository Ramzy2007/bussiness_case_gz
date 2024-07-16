import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Package } from './package';
import { Delivery } from './delivery';

export interface Options {
  headers?:
    | HttpHeaders
    | Record<string, string | string[]>;
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | Record<string, | string
          | number
          | boolean
          | readonly (string | number | boolean)[]>;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}


export interface ApiResponse{
    status: number,
    message: string,
    data?: Package | Package[] | Delivery | Delivery[]
}

export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | readonly (string | number | boolean)[];
  page: number;
  perPage: number;
}

export interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}

export class WayPoints {
  start: any;
  end: any
}