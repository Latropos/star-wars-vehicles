import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Animation from "./Animation";

import { Ionicons } from "@expo/vector-icons";
const Stack = createStackNavigator();

//---------------------------------
export default function VehicleStack({ navigation }) {
    return (
        <Stack.Navigator
            initialRouteName="MovieStack"
            screenOptions={{
                headerTitle: () => <Text>Movies</Text>,
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Ionicons name="md-menu" size={32} color="black" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen name="Animation" component={Animation} />
        </Stack.Navigator>
    );
}
