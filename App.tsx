import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from '@react-navigation/stack';

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import TabOneScreen from "./screens/TabOneScreen";
import TabTwoScreen from "./screens/TabTwoScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="One">
        <Stack.Screen name="One" component={TabOneScreen} />
        <Stack.Screen name="Two" component={TabTwoScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
