import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Text, View } from "../components/Themed";
import fetchAPI from "../fetchApi";
import { Vehicle } from "../models";

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

  async function loadNewPage() {
    const results = await fetchAPI.getVehiclesList(page);
    setData(data.concat(results));
    setPage(page + 1);
  }

  async function loadCount() {
    const no_results = await fetchAPI.getVehiclesCount();
    setCount(no_results);
  }
  useEffect(() => {
    loadCount();
    loadNewPage();
    setLoading(false);
  }, []);

  const renderItem = ({ item }) => {
    if (item != undefined)
      var item_unique = {
        ...item,
        id: item.url.split("/")[item.url.split("/").length - 2],
      };

    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate("Details", {
            screen: "Details",
            id: item_unique.id,
          })
        }
      />
    );
  };

  function onEndReached() {
    if (page < 5) {
      loadNewPage();
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
        {isLoading ? (
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
