import NotFoundScreen from "./screens/NotFoundScreen";
import { Vehicle, VehicleList } from "./types";

function handle_error() {}
const fetchAPI = {
  getVehiclesListAndCount: async function (
    page: number
  ): Promise<[[], number]> {
    try {
      let url = `https://swapi.dev/api/vehicles/?page=${page}`;
      const response = await fetch(url);
      const json = await response.json();
      return [json.results, json.count];
    } catch (err) {
      handle_error();
    }
    return [[], 0];
  },
  nextPageVehiclesExists: async function (page: number) {
    try {
      let url = `https://swapi.dev/api/vehicles/?page=${page}`;
      const response = await fetch(url);
      const json = await response.json();
      return json.next != null;
    } catch (err) {
      handle_error();
    }
    return 0;
  },
  getVehicle: async function (id: number): Promise<Vehicle> {
    let url = `https://swapi.dev/api/vehicles/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  },
};

export default fetchAPI;
