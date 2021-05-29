// store.js
import React, { Dispatch, DispatchWithoutAction, useReducer } from "react";
import { Vehicle } from "./types";

export const AppStateContext = React.createContext<unknown>(undefined);

const initialState = { color: "white", vehicleDetails: {} };

type ContextType = {
    vehicleDetails: { [id: number]: Vehicle };
};

const reducer = (
    state: ContextType,
    action: { type: string; payload: { vehicle: Vehicle; vehicleId: number } }
) => {
    //TODO
    //Nie używam dispatch
    switch (action.type) {
        case "ADD_VEHICLE":
            console.log("ADD_VEHICLE");
            return {
                vehicleDetails: {
                    [action.payload.vehicleId]: action.payload.vehicle,

                    ...state.vehicleDetails,
                },
            };
        default:
            throw new Error();
    }
};

export const AppStateProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppStateContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppStateContext.Provider>
    );
};
