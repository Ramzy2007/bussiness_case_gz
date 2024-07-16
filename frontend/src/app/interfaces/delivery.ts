import { Location, Package } from "./package";

export interface Delivery {
    _id?: string;
    start_time: string,
    end_time: string,
    status: string,
    pickup_time: string,
    location: Location,
    package: string,
    createdAt?: string,
    updatedAt?: string
  }
