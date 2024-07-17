export interface Packages {
  items: Package[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Package {
  _id?: string;
  active_delivery_id?: string;
  description: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  to_name: string;
  to_address: string;
  from_location: Location;
  to_location: Location;
  createdAt?: string;
  updatedAt?: string;
}
