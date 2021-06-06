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

import { AppStateProvider } from "./utils/cache";
import FormStack from "./screens/FormStack/FormStack";

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
        </DrawerContentScrollView>
    );
}

//---------------------------------
export default function App() {
    const [isOpen, setOpen] = useState(false);
    const isLoadingComplete = useCachedResources();
    const ThemeContext = React.createContext("peru");

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
