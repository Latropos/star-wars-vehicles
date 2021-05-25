import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from "react-native";
import fetchAPI from "../../utils/fetchApi";
import service from "../../utils/service";
import { Props } from "./VehicleStack";
import { Vehicle, VehicleList } from "../../types";

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

//#region -------------------------------------------------
export default function VehicleListScreen({ route, navigation }: Props) {
    const [data, setData] = useState<VehicleList>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [nextPageExists, setNextPageExists] = useState(true);

    async function loadThisPage() {
        setErrorMessage("");
        try {
            const [results, num_of_results, next_page_existst] =
                await fetchAPI.getVehiclesListAndCount(page);

            setData(data.concat(results));
            setCount(num_of_results);
            setNextPageExists(next_page_existst);

            setPage(page + 1);
        } catch (err) {
            setErrorMessage("Sorry, we can't fetch your API");
        }
    }

    useEffect(() => {
        loadThisPage();
    }, []);

    const renderItem = ({ item }: any) => {
        return (
            <Item
                item={item}
                onPress={() =>
                    navigation.navigate("VehicleDetails", {
                        id: service.getId(item.url),
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
    //#endregion

    //#region ---------------sorting------------------
    function sortVehicleListByName(vehiclelist: VehicleList): VehicleList {
        return [...vehiclelist].sort((a, b) => (a.name < b.name ? -1 : 1));
    }
    function sortVehicleListByLength(vehiclelist: VehicleList): VehicleList {
        return [...vehiclelist].sort((a, b) => (a.length < b.length ? -1 : 1));
    }
    function sortVehicleListByCrew(vehiclelist: VehicleList): VehicleList {
        return [...vehiclelist].sort((a, b) => (a.crew < b.crew ? -1 : 1));
    }

    //buttons:
    function sortByName() {
        setData(sortVehicleListByName(data));
    }
    function sortByLength() {
        setData(sortVehicleListByLength(data));
    }
    function sortByCrew() {
        setData(sortVehicleListByCrew(data));
    }

    //#endregion
    return (
        <View
            style={[
                { padding: 25 },
                {
                    transform: [
                        { rotateX: "45deg" },
                        { scaleY: 1.2 },
                        { perspective: 1500 },
                    ],
                },
            ]}
        >
            {!!errorMessage && <Text> {errorMessage}</Text>}

            <View>
                {!data ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.5}
                        data={data}
                        ListHeaderComponent={() => (
                            <View>
                                <Text style={styles.sortBy}>Sort by:</Text>
                                <View style={styles.sortBar}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={sortByName}
                                    >
                                        <Text style={styles.title}>Name</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={sortByLength}
                                    >
                                        <Text style={styles.title}>Length</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={sortByCrew}
                                    >
                                        <Text style={styles.title}>Crew</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        ListFooterComponent={() => (
                            <Text style={styles.count}>Total: {count}</Text>
                        )}
                        keyExtractor={(item, index) =>
                            item === undefined ? "1" : item.url
                        }
                        renderItem={renderItem}
                    />
                )}
            </View>
        </View>
    );
}

//#region---------------styles-------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    sortBy: {
        marginHorizontal: 16,
        color: "lightgray",
    },
    sortBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginHorizontal: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: "cornflowerblue",
        padding: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#03062b",
    },
    count: {
        marginHorizontal: 16,
        color: "lightgray",
    },
    item: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 16,
        backgroundColor: "peru",
    },
});
//#endregion
