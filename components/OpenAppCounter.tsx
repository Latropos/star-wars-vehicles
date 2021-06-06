import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants/AsyncStorage";

export default function OpenAppCounter() {
    const [counter, setCounter] = useState("");

    const getAppCounter = async () => {
        try {
            const value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null) {
                setCounter(value);
            }
        } catch (e) {}
    };

    useEffect(() => {
        getAppCounter();
    }, []);

    return (
        <View style={styles.container}>
            <Text>You opened this app {counter} times</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 12,
        padding: 5,
        margin: 5,
    },
});
