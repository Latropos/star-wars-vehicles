import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import useCachedResources from "./hooks/useCachedResources";

import VehicleListScreen from "./screens/VehicleListScreen";
import VehicleDetailsScreen from "./screens/VehicleDetailsScreen";
import MovieListScreen from "./screens/MovieListScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
    return (
        <DrawerContentScrollView>
            <DrawerItem
                label="Vehicles"
                onPress={() => navigation.navigate("Vehicles")}
                labelStyle={styles.drawerLabel}
            />
            <DrawerItem
                label="Movies"
                onPress={() => navigation.navigate("Movies")}
                labelStyle={styles.drawerLabel}
            />
        </DrawerContentScrollView>
    );
}

//---------------------------------
export default function App() {
    const [isOpen, setOpen] = useState(false);
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Vehicles"
                    overlayColor="transparent"
                    drawerStyle={styles.drawer}
                    drawerContent={CustomDrawerContent}
                >
                    <Drawer.Screen
                        name="Vehicles"
                        component={VehicleListScreen}
                    />
                    <Drawer.Screen
                        name="VehicleDetails"
                        component={VehicleDetailsScreen}
                    />
                    <Drawer.Screen name="Movies" component={MovieListScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

//---------------styles-------------------
const styles = StyleSheet.create({
    drawer: {
        backgroundColor: "#c6cbef",
        width: 240,
    },
    drawerLabel: {
        fontSize: 20,
    },
});
