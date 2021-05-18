import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    OpaqueColorValue,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Vehicle } from "../../types";
import fetchAPI from "../../fetchApi";

interface DetailsItemProps {
    name: string;
    value: string;
}

const DetailsItem = ({ name, value }: DetailsItemProps) => (
    <View style={styles.detailsItem}>
        <Text style={styles.listItem}>
            {name}: {value}
        </Text>
    </View>
);

const Mendelejew = ({ name, value }: DetailsItemProps) => (
    <View style={styles.box}>
        {value == "unknown" ? (
            <Text style={{ fontSize: 40 }}>?</Text>
        ) : (
            <View>
                {value.length > 4 ? (
                    <Text style={{ fontSize: 28 }}>{value}</Text>
                ) : (
                    <Text style={{ fontSize: 40 }}>{value}</Text>
                )}
            </View>
        )}
        <Text style={styles.boxLabel}>{name}</Text>
    </View>
);

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
                        <Mendelejew
                            name="Cost in credits"
                            value={vehicle.cost_in_credits}
                        />
                        <Mendelejew
                            name="Max atm speed"
                            value={vehicle.max_atmosphering_speed}
                        />
                        <Mendelejew
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
    listItem: {
        fontSize: 20,
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
    detailsItem: {
        padding: 10,
        borderRadius: 5,
        margin: 25,
        backgroundColor: "papayawhip",
        borderColor: "coral",
        borderWidth: 2,
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
