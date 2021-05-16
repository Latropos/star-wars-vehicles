import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Text, View } from "react-native";
import fetchAPI from "../fetchApi";
import {
    Vehicle,
    VehicleList,
    sortVehicleListByName,
    sortVehicleListByLength,
    sortVehicleListByCrew,
} from "../types";

interface ItemProps {
    item: Vehicle;
    onPress: () => void;
}

const Item = ({ item, onPress }: ItemProps) =>
    item === undefined ? (
        <Text></Text>
    ) : (
        <TouchableOpacity onPress={onPress} style={[styles.item]}>
            <Text style={[styles.title]}>{item.name}</Text>
        </TouchableOpacity>
    );

export default function VehicleListScreen({ navigation }) {
    const [data, setData] = useState<VehicleList>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [nextPageExists, setNextPageExists] = useState<boolean | 0>(true);

    async function loadThisPage() {
        const [results, num_of_results] =
            await fetchAPI.getVehiclesListAndCount(page);
        setData(data.concat(results));
        setCount(num_of_results);
        setNextPageExists(await fetchAPI.nextPageVehiclesExists(page));
        setPage(page + 1);
    }

    useEffect(() => {
        loadThisPage();
        console.log(data);
    }, []);

    const renderItem = ({ item }) => {
        function getId({ item }) {
            return item.url.split("/")[item.url.split("/").length - 2];
        }

        return (
            <Item
                item={item}
                onPress={() =>
                    navigation.navigate("VehicleDetails", {
                        screen: "VehicleDetails",
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

    function sortByName() {
        setData(sortVehicleListByName(data));
    }
    function sortByLength() {
        setData(sortVehicleListByLength(data));
    }
    function sortByCrew() {
        setData(sortVehicleListByCrew(data));
    }
    return (
        <View style={styles.container}>
            <View
                style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    padding: 40,
                }}
            />
            <Text style={styles.title}>Sort by:</Text>
            <View style={styles.sortBar}>
                <TouchableOpacity style={styles.button} onPress={sortByName}>
                    <Text style={styles.title}>Name</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={sortByLength}>
                    <Text style={styles.title}>Length</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={sortByCrew}>
                    <Text style={styles.title}>Crew</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, padding: 24 }}>
                <Text style={styles.count}>Total: {count}</Text>
                {!data ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.5}
                        data={data}
                        keyExtractor={(item, index) =>
                            item === undefined ? 1 : item.url
                        }
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
    sortBar: {
        flexDirection: "row",
    },
    button: {
        backgroundColor: "cornflowerblue",
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    count: {
        fontSize: 20,
        fontWeight: "bold",
    },
    item: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "peru",
    },
});
