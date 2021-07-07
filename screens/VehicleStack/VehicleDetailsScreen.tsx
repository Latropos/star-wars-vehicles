import React, { useEffect, useState, useContext, useReducer } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useGetVehicle } from "../../utils/fetchApi";
import MendelejewBox from "./MendelejewBox";
import DetailsItem from "./DetailsItem";

export default function VehicleDetailsScreen({ route }: any) {
  const [errorMessage, vehicle] = useGetVehicle(route.params.id);

  return (
    <View style={styles.container}>
      {errorMessage ? <Text> {errorMessage}</Text> : <View></View>}

      {vehicle === undefined ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.optionContainer}>
            <DetailsItem name="Name" value={vehicle!.name} />
            <DetailsItem name="Model" value={vehicle!.model} />
            <DetailsItem name="Manufacturer" value={vehicle!.manufacturer} />
          </View>

          <View style={styles.MendelejewRow}>
            <MendelejewBox
              name="Cost in credits"
              value={vehicle!.cost_in_credits}
            />

            <MendelejewBox
              name="Max atm speed"
              value={vehicle!.max_atmosphering_speed}
            />
            <MendelejewBox name="Passengers" value={vehicle!.passengers} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  detailsItem: {},
  listItem: {},
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
