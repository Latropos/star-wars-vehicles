import React, { useEffect, useState, useContext } from "react";
import { Movie, Vehicle, VehicleList } from "./types";

import { AppStateContext } from "./cache";

export async function getVehiclesListAndCount(page: number): Promise<{
    results: VehicleList;
    numberOfVehicles: number;
    hasNextPage: boolean;
}> {
    const url = `https://swapi.dev/api/vehicles/?page=${page}`;
    const response = await fetch(url);
    const json = await response.json();

    // for (const vehicle of json.results) {
    //     console.log(vehicle);
    // }

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
    const [state, dispatch] = useContext(AppStateContext);
    const [vehicle, setVehicle] = useState<Vehicle | undefined>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    useEffect(() => {
        async function loadVehicle() {
            if (state.vehicleDetails[id] !== undefined) {
                console.log("Used cached vehicle");
                const vehicle = state.vehicleDetails[id];
                setVehicle(vehicle);
            } else {
                try {
                    console.log("NO cached vehicle");
                    const json = await getVehicle(id);
                    console.log(id);
                    setVehicle(json);
                    state.vehicleDetails[id] = json;
                } catch (err) {
                    setErrorMessage("Sorry, we can't fetch your API");
                }
            }
        }
        loadVehicle();
    }, [id]);

    return [errorMessage, vehicle];
};

export default fetchAPI;
