import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MovieListScreen from "./MovieListScreen";
import MenuButton from "../../components/MenuButton";
import colors from "../../constants/Colors";
import OpeningCrawl from "./OpeningCrawlScreen";
const Stack = createStackNavigator();

//---------------------------------
export default function VehicleStack({ navigation }: any) {
  return (
    <Stack.Navigator
      initialRouteName="MovieStack"
      screenOptions={{
        cardStyle: { backgroundColor: colors.backgroundColor },
      }}
    >
      <Stack.Screen
        name="MovieListScreen"
        component={MovieListScreen}
        options={{
          headerTitle: () => <Text>Movies</Text>,
          headerLeft: () => <MenuButton navigation={navigation} />,
        }}
      />
      <Stack.Screen name="Animation" component={OpeningCrawl} />
    </Stack.Navigator>
  );
}
