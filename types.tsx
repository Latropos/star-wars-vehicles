export interface Vehicle {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    max_atmosphering_speed: string;
    passengers: string;
    crew: number;
    length: number;
}
export type VehicleList = Array<Vehicle>;

export interface Movie {
    title: string;
    opening_crawl: string;
}
