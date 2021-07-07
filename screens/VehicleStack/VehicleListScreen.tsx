import React, { useEffect, useState, useContext } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getVehiclesListAndCount } from "../../utils/fetchApi";
import service from "../../utils/service";
import { Props } from "./VehicleStack";
import { Vehicle, VehicleList } from "../../utils/types";
import { AppStateContext } from "../../utils/cache";

interface ItemProps {
  item: Vehicle;
  onPress: () => void;
  color: string;
}



const Item = ({ item, onPress, color }: ItemProps) =>
  item === undefined ? (
    <Text></Text>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.item,
        {
          backgroundColor: color,
        },
      ]}
    >
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
    const [currentSortingOption, setCurrentSortingOption] = useState<String>("")
    const [currentSortingDirection, setCurrentSortingDirection] = useState(1)

  async function loadThisPage() {
    setErrorMessage("");
    try {
      const { results, numberOfVehicles, hasNextPage } =
        await getVehiclesListAndCount(page);

      setData(data.concat(results));
      setCount(numberOfVehicles);
      setNextPageExists(hasNextPage);

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
        onPress={() => {
          const vehicleId = service.getId(item.url);
          if (vehicleId !== undefined)
            navigation.navigate("VehicleDetails", {
              id: vehicleId,
            });
        }}
        color="peru"
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
    function SortingOption ({onPress, name}) {
        const color = name === currentSortingOption ? "powderblue" : "steelblue";
        const arrow = name === currentSortingOption ? (currentSortingDirection === 1 ? "🔽" : "🔼") : "  ";

        return (
            <TouchableOpacity
                style={[styles.button, {backgroundColor: color}]
            }
                onPress={onPress}>
                    <Text style={styles.sortingOption}>{name}  {arrow}</Text>
            </TouchableOpacity>
        )
    }

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
    function sortBy(sortingOption : String, sortingFuntion){
        setData(sortingFuntion(data));
        if (currentSortingOption === sortingOption){
            setData([...data].reverse())
            setCurrentSortingDirection(currentSortingDirection*(-1))
        }
        else(
            setCurrentSortingDirection(1)
        )
        setCurrentSortingOption(sortingOption);         

    }

    //#endregion
    return (
        <View>
            {!!errorMessage && <Text> {errorMessage}</Text>}                            
            <View>
                <Text style={styles.sortBy}>Sort by:</Text>
                <View style={styles.sortBar}>
                    <SortingOption
                    onPress={() => sortBy("Name", sortVehicleListByName)}
                    name="Name"
                    />
                    <SortingOption
                    onPress={() => sortBy("Length", sortVehicleListByLength)}
                    name="Length"
                    />
                    <SortingOption
                    onPress={() => sortBy("Crew", sortVehicleListByCrew)}
                    name="Crew"
                    />

                </View>
            </View>

            <View>
                {!data ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.5}
                        data={data}
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
<<<<<<< HEAD
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
  },
=======
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    sortBy: {
        marginHorizontal: 16,
        color: "lightgray",
    },
    sortingOption: {
        fontSize: 20,
    },
    sortBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginHorizontal: 16,
        marginBottom: 16,
    },
    button: {
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
    },
>>>>>>> main
});
//#endregion
