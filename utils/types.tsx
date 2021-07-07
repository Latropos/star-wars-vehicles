export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  max_atmosphering_speed: string;
  passengers: string;
  crew: number;
  length: number;
  url: string;
}

export type VehicleList = Array<Vehicle>;

export interface Movie {
  title: string;
  opening_crawl: string;
}

export interface Movie {
  title: string;
  opening_crawl: string;
  director: string;
}
