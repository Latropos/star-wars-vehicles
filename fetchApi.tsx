import { Vehicle, VehicleList } from "./types";

const fetchAPI = {
  getVehiclesListAndCount: async function (
    page: number
  ): Promise<[VehicleList, number]> {
    let url = `https://swapi.dev/api/vehicles/?page=${page}`;
    const response = await fetch(url);
    const json = await response.json();
    return [json.results, json.count];
  },
  nextPageVehiclesExists: async function (page: number) {
    let url = `https://swapi.dev/api/vehicles/?page=${page}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.next != null;
  },
  getVehicle: async function (id: number): Promise<Vehicle> {
    let url = `https://swapi.dev/api/vehicles/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  },
};

export default fetchAPI;
