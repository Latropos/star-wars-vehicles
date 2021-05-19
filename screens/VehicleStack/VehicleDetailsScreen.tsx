import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Vehicle } from "../../types";
import fetchAPI from "../../fetchApi";
import MendelejewBox from "./MendelejewBox";
import DetailsItem from "./DetailsItem";

export default function VehicleDetailsScreen({ route }) {
    const [isLoading, setLoading] = useState(true);
    const [vehicle, setVehicle] = useState<Vehicle | undefined>();
    const [errorMessage, setErrorMessage] = useState<string>(undefined);

    useEffect(() => {
        async function loadVehicle() {
            setErrorMessage(undefined);
            try {
                let id: number = route.params.id;

                const json = await fetchAPI.getVehicle(id);
                setVehicle(json);
                setLoading(false);
            } catch (err) {
                setErrorMessage("Sorry, we can't fetch your API");
            }
        }
        loadVehicle();
    }, []);

    return (
        <View style={styles.container}>
            {errorMessage ? <Text> {errorMessage}</Text> : <View></View>}

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <View style={styles.optionContainer}>
                        <DetailsItem name="Name" value={vehicle.name} />
                        <DetailsItem name="Model" value={vehicle.model} />
                        <DetailsItem
                            name="Manufacturer"
                            value={vehicle.manufacturer}
                        />
                    </View>

                    <View style={styles.MendelejewRow}>
                        <MendelejewBox
                            name="Cost in credits"
                            value={vehicle.cost_in_credits}
                        />

                        <MendelejewBox
                            name="Max atm speed"
                            value={vehicle.max_atmosphering_speed}
                        />
                        <MendelejewBox
                            name="Passengers"
                            value={vehicle.passengers}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: "center",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    optionContainer: {
        height: 250,
        justifyContent: "space-around",
    },

    MendelejewRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    box: {
        width: 100,
        height: 100,
        borderColor: "steelblue",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "skyblue",
    },
    boxLabel: {
        fontSize: 12,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
