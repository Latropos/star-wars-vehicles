import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
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

const emptyVehicle = (): Vehicle => ({
  name: "---",
  model: "---",
  manufacturer: "",
  cost_in_credits: "",
  max_atmosphering_speed: "",
  passengers: "",
});

export default function VehicleDetailsScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  //TODO
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(emptyVehicle);

  useEffect(() => {
    async function loadVehicle() {
      let id: number = route.params.id;

      const json = await fetchAPI.getVehicle(id);
      setVehicle(json);
    }
    loadVehicle();
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wehicle details:</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <DetailsItem name="Name" value={vehicle.name} />
          <DetailsItem name="Model" value={vehicle.model} />
          <DetailsItem name="Manufacturer" value={vehicle.manufacturer} />
          <DetailsItem name="Cost in credits" value={vehicle.cost_in_credits} />
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
