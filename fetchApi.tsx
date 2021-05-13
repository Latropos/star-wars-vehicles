import { Vehicle } from "./models";

const fetchAPI = {
  getVehiclesList: async function (page: number): Promise<[]> {
    let url = `https://swapi.dev/api/vehicles/?page=${page}`;
    const response = await fetch(url);
    const json = await response.json();
    return json.results;
  },

  getVehiclesCount: async function (): Promise<number> {
    let url = "https://swapi.dev/api/vehicles/";
    const response = await fetch(url);
    const json = await response.json();
    return json.count;
  },
  getVehicle: async function (id: number): Promise<Vehicle> {
    let url = `https://swapi.dev/api/vehicles/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  },
};

export default fetchAPI;
