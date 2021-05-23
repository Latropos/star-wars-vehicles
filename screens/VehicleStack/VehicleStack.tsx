import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import VehicleListScreen from "./VehicleListScreen";
import VehicleDetailsScreen from "./VehicleDetailsScreen";
import MenuButton from "../../components/MenuButton";
const Stack = createStackNavigator();

//---------------------------------
export default function VehicleStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="VehicleList"
            screenOptions={{
                cardStyle: { backgroundColor: "#03062b" },
            }}
        >
            <Stack.Screen
                name="VehicleList"
                component={VehicleListScreen}
                options={{
                    headerTitle: () => <Text>Movies</Text>,
                    headerLeft: () => <MenuButton navigation={navigation} />,
                }}
            />
            <Stack.Screen
                name="VehicleDetails"
                component={VehicleDetailsScreen}
            />
        </Stack.Navigator>
    );
}
