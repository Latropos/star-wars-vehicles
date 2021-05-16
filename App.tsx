import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import VehicleListScreen from "./screens/VehicleListScreen";
import VehicleDetailsScreen from "./screens/VehicleDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Vehicles">
          <Stack.Screen name="Vehicles" component={VehicleListScreen} />
          <Stack.Screen name="Details" component={VehicleDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
