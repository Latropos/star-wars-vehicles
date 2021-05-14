import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Text, View } from "../components/Themed";
import fetchAPI from "../fetchApi";
import { Vehicle } from "../types";

interface ItemProps {
  item: Vehicle;
  onPress: () => void;
}

const Item = ({ item, onPress }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <Text style={[styles.title]}>{item.name}</Text>
  </TouchableOpacity>
);

export default function VehicleListScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [nextPageExists, setNextPageExists] = useState(true);

  async function loadThisPage() {
    const [results, num_of_results] = await fetchAPI.getVehiclesListAndCount(
      page
    );
    setData(data.concat(results));
    setCount(num_of_results);
    setNextPageExists(await fetchAPI.nextPageVehiclesExists(page));
    setPage(page + 1);
  }

  useEffect(() => {
    loadThisPage();
    setLoading(false);
  }, []);

  const renderItem = ({ item }) => {
    function getId({ item }) {
      return item.url.split("/")[item.url.split("/").length - 2];
    }

    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate("Details", {
            screen: "Details",
            id: getId({ item }),
          })
        }
      />
    );
  };

  function onEndReached() {
    if (nextPageExists) {
      loadThisPage();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Star wars wehicles</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={{ flex: 1, padding: 24 }}>
        <Text style={styles.count}>Total: {count}</Text>
        {!data ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            data={data}
            keyExtractor={(item) => item.url}
            renderItem={renderItem}
          />
        )}
      </View>
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
    fontSize: 30,
    fontWeight: "bold",
  },
  count: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  item: {
    padding: 20,
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "peru",
  },
});
