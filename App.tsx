import React, { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
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
                    <Drawer.Screen name="Vehicles" component={VehicleStack} />

                    <Drawer.Screen name="Movies" component={MovieStack} />
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
