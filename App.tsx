import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import useCachedResources from "./hooks/useCachedResources";

import VehicleStack from "./screens/VehicleStack/VehicleStack";
import MovieStack from "./screens/MovieStack/MovieStack";

import { AppStateProvider } from "./utils/cache";
import FormStack from "./screens/FormStack/FormStack";
import OpenAppCounter from "./components/OpenAppCounter";
import { STORAGE_KEY } from "./constants/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }: any) {
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

            <DrawerItem
                label="Form"
                onPress={() => navigation.navigate("Form")}
                labelStyle={styles.drawerLabel}
            />
            <OpenAppCounter />
        </DrawerContentScrollView>
    );
}

//---------------------------------
export default function App() {
    const incrementAppCounter = async () => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null) {
                const new_val = parseInt(value) + 1 + "";
                await AsyncStorage.setItem(STORAGE_KEY, new_val);
            } else AsyncStorage.setItem(STORAGE_KEY, "1");
        } catch (e) {}
    };

    useEffect(() => {
        incrementAppCounter();
    }, []);

    return (
        <AppStateProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Form"
                    overlayColor="transparent"
                    drawerStyle={styles.drawer}
                    drawerContent={CustomDrawerContent}
                >
                    <Drawer.Screen name="Vehicles" component={VehicleStack} />

                    <Drawer.Screen name="Movies" component={MovieStack} />
                    <Drawer.Screen name="Form" component={FormStack} />
                </Drawer.Navigator>
            </NavigationContainer>
        </AppStateProvider>
    );
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
