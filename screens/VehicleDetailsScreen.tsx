import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Vehicle } from "../types";
import fetchAPI from "../fetchApi";

interface DetailsItemProps {
    name: string;
    value: string;
}

const DetailsItem = ({ name, value }: DetailsItemProps) => (
    <Text style={styles.listItem}>
        {name}: {value}
    </Text>
);

export default function VehicleDetailsScreen({ route }) {
    const [isLoading, setLoading] = useState(true);
    const [vehicle, setVehicle] = useState<Vehicle | undefined>();

    useEffect(() => {
        async function loadVehicle() {
            let id: number = route.params.id;

            const json = await fetchAPI.getVehicle(id);
            setVehicle(json);
            setLoading(false);
        }
        loadVehicle();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.separator} />

            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <View>
                    <DetailsItem name="Name" value={vehicle.name} />
                    <DetailsItem name="Model" value={vehicle.model} />
                    <DetailsItem
                        name="Manufacturer"
                        value={vehicle.manufacturer}
                    />
                    <DetailsItem
                        name="Cost in credits"
                        value={vehicle.cost_in_credits}
                    />
                    <DetailsItem
                        name="Max atm speed"
                        value={vehicle.max_atmosphering_speed}
                    />
                    <DetailsItem name="Passengers" value={vehicle.passengers} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
});
