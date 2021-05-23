import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import VehicleListScreen from "./VehicleListScreen";
import VehicleDetailsScreen from "./VehicleDetailsScreen";

import { Ionicons } from "@expo/vector-icons";
const Stack = createStackNavigator();

//---------------------------------
export default function VehicleStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="VehicleList"
            screenOptions={{
                headerTitle: () => <Text>Vehicles</Text>,
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons name="md-menu" size={32} color="black" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen name="VehicleList" component={VehicleListScreen} />
            <Stack.Screen
                name="VehicleDetails"
                component={VehicleDetailsScreen}
            />
        </Stack.Navigator>
    );
}
