// store.js
import React, { createContext, useReducer, useContext } from "react";

export const AppStateContext = React.createContext();

export const AppStateProvider = (props) => {
    const contextValue = { color: "peru" };

    return (
        <AppStateContext.Provider value={contextValue}>
            {props.children}
        </AppStateContext.Provider>
    );
};
