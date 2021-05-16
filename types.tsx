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

export function sortVehicleListByName(vehiclelist: VehicleList): VehicleList {
    return [...vehiclelist].sort((a, b) => (a.name < b.name ? -1 : 1));
}
export function sortVehicleListByLength(vehiclelist: VehicleList): VehicleList {
    return [...vehiclelist].sort((a, b) => (a.length < b.length ? -1 : 1));
}
export function sortVehicleListByCrew(vehiclelist: VehicleList): VehicleList {
    return [...vehiclelist].sort((a, b) => (a.crew < b.crew ? -1 : 1));
}
