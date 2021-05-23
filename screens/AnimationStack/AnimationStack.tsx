import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import MenuButton from "../../components/MenuButton";
import Animation from "./Animation";

const Stack = createStackNavigator();

//---------------------------------
export default function VehicleStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="MovieStack">
            <Stack.Screen
                name="Animation"
                component={Animation}
                options={{
                    headerTitle: () => <Text>Movies</Text>,
                    headerLeft: () => <MenuButton navigation={navigation} />,
                }}
            />
        </Stack.Navigator>
    );
}
