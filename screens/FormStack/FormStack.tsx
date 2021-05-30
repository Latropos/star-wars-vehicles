import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import FormScreen from "./FormScreen";
import MenuButton from "../../components/MenuButton";
import colors from "../../constants/Colors";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

//#region main
export default function FormStack({ navigation }: any) {
    return (
        <Stack.Navigator initialRouteName="Form">
            <Stack.Screen
                name="Form"
                component={FormScreen}
                options={{
                    headerTitle: () => <Text>Vehicles</Text>,
                    headerLeft: () => <MenuButton navigation={navigation} />,
                }}
            />
        </Stack.Navigator>
    );
}
//#endregion
