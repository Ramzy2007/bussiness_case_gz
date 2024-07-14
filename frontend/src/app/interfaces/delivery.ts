import { Location, Package } from "./package";

export interface Delivery {
    id_?: string;
    start_time: string,
    end_time: string,
    status: string,
    pickup_time: string,
    location: Location,
    package: Package[],
    createdAt: string,
    updatedAt: string
  }
