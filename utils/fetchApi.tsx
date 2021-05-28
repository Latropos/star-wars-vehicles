import React, { useEffect, useState } from "react";
import { Movie, Vehicle, VehicleList } from "./types";

const vehicleCache = {};

export async function getVehiclesListAndCount(page: number): Promise<{
    results: VehicleList;
    numberOfVehicles: number;
    hasNextPage: boolean;
}> {
    const url = `https://swapi.dev/api/vehicles/?page=${page}`;
    const response = await fetch(url);
    const json = await response.json();
    return {
        results: json.results,
        numberOfVehicles: json.count,
        hasNextPage: json.next != null,
    };
}

async function getVehicle(id: number): Promise<Vehicle> {
    const url = `https://swapi.dev/api/vehicles/${id}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export const useGetVehicle = (id: number): [string, Vehicle | undefined] => {
    const [vehicle, setVehicle] = useState<Vehicle | undefined>();
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        async function loadVehicle() {
            if (vehicleCache[id]) {
                console.log("Used cached vehicle");
                const vehicle = vehicleCache[id];
                setVehicle(vehicle);
            } else {
                try {
                    const json = await getVehicle(id);
                    vehicleCache[id] = json;
                    setVehicle(json);
                } catch (err) {
                    setErrorMessage("Sorry, we can't fetch your API");
                }
            }
        }
        loadVehicle();
    }, [id]);

    return [errorMessage, vehicle];
};
//------------------Movies------------------------
export async function getMovies(): Promise<[Movie]> {
    const url = `https://swapi.dev/api/films/`;
    const response = await fetch(url);
    const json = await response.json();
    return json.results;
}
