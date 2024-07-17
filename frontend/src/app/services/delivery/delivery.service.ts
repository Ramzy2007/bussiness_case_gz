import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ApiResponse, PaginationParams } from '../../interfaces/others';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  constructor(private apiService: ApiService) {}

  // Getting packages from the API
  getDeliveries = (
    url: string,
    params?: PaginationParams,
  ): Observable<ApiResponse> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  // Adding a package via the API
  addDelivery = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  // Editing a package via the API
  editDelivery = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  // Deleting a package via the API
  deleteDelivery = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };

  getDelivery(url: string): Observable<any> {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  }
}
