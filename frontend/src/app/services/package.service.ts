import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, Packages, PaginationParams } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private apiService: ApiService) {}

  // Getting packages from the API
  getPackages = (
    url: string,
    params?: PaginationParams
  ): Observable<ApiResponse> => {
    console.log('########## 001 ##########');
    console.log(params);
    console.log('########## 002 ##########');
    console.log(url);
    console.log('########## 003 ##########');
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

   // Adding a package via the API
   addPackage = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  // Editing a package via the API
  editPackage = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  // Deleting a package via the API
  deletePackage = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };

  getPackage( url: string): Observable<any> {
    return this.apiService.get(url, {
      responseType: 'json',
    });
}
}
