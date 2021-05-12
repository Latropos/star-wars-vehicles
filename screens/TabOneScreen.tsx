import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from "../components/Themed";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <Text style={[styles.title]}>{item.name}</Text>
  </TouchableOpacity>
);

export default function TabOneScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1); 

  let nextItemId = 0;

  async function fetchAPI(){
    let url = "https://swapi.dev/api/vehicles/?page=" + String(page);
    console.log(url);
    let config = {};
    const response = await fetch(url);
    const json = await response.json();

    setData(data.concat(json.results));
    setCount(json.count);
    setLoading(false);    
    setPage(page + 1);   
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  const renderItem = ({ item }) => {
    item.id = item.url.split("/")[item.url.split("/").length - 2];

    return (
      <Item
        item={item}
        onPress={() =>
          navigation.navigate("Details", {
            screen: "Details",
            id: item.id ,
          })
        }
      />
    );
  };

  function onEndReached() {
    console.log(page);
    if (page < 5) {
      fetchAPI();
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
            keyExtractor={(item, index) => item.url}
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
