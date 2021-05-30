import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import VehicleListScreen from "./VehicleListScreen";
import VehicleDetailsScreen from "./VehicleDetailsScreen";
import MenuButton from "../../components/MenuButton";
import colors from "../../constants/Colors";
import { StackScreenProps } from "@react-navigation/stack";

type VehicleStackParamList = {
    VehicleList: undefined;
    VehicleDetails: { id: string };
};

export type Props = StackScreenProps<VehicleStackParamList>;

const Stack = createStackNavigator<VehicleStackParamList>();
//#region main
export default function VehicleStack({ navigation }: any) {
    return (
        <Stack.Navigator
            initialRouteName="VehicleList"
            screenOptions={{
                cardStyle: { backgroundColor: colors.backgroundColor },
            }}
        >
            <Stack.Screen
                name="VehicleList"
                component={VehicleListScreen}
                options={{
                    headerTitle: () => <Text>Vehicles</Text>,
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
//#endregion
