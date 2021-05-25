import { Vehicle, VehicleList } from "../types";

const fetchAPI = {
    //---------------Vehicles------------------
    getVehiclesListAndCount: async function (
        page: number
    ): Promise<[[], number, boolean]> {
        let url = `https://swapi.dev/api/vehicles/?page=${page}`;
        const response = await fetch(url);
        const json = await response.json();
        return [json.results, json.count, json.next != null];
    },
    getVehicle: async function (id: number): Promise<Vehicle> {
        let url = `https://swapi.dev/api/vehicles/${id}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    },
    //------------------Movies------------------------
    getMovies: async function () {
        let url = `https://swapi.dev/api/films/`;
        const response = await fetch(url);
        const json = await response.json();
        return json.results;
    },
};

export default fetchAPI;