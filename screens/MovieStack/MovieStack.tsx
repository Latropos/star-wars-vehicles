import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieListScreen from "./MovieListScreen";
import MenuButton from "../../components/MenuButton";
const Stack = createStackNavigator();

//---------------------------------
export default function VehicleStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="MovieStack">
            <Stack.Screen
                name="MovieListScreen"
                component={MovieListScreen}
                options={{
                    headerTitle: () => <Text>Movies</Text>,
                    headerLeft: () => <MenuButton navigation={navigation} />,
                }}
            />
        </Stack.Navigator>
    );
}
