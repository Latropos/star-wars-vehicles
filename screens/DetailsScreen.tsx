import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";


const DetailItem = ({ name, value }) => (
  <Text style={styles.listItem}>{name}: {value}</Text>
);


export default function DetailsScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState("");
  let id = route.params.id;

  useEffect(() => {

    async function fetchAPI(){
      let url = "https://swapi.dev/api/vehicles/" + String(id);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      console.log(json);
      setLoading(false);
    }
    fetchAPI();    
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
        <DetailItem name="Name" value = {data.name} />
          <DetailItem name="Model" value = {data.model} />
          <DetailItem name="Manufacturer" value = {data.manufacturer} />
          <DetailItem name="Cost in credits" value = {data.cost_in_credits} />
          <DetailItem name="Max atm speed" value = {data.max_atmosphering_speed} />
          <DetailItem name="Passengers" value = {data.passengers} />
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
