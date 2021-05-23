import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function MenuButton({ navigation }) {
    return (
        <TouchableOpacity
            style={styles.menuButtonn}
            onPress={() => navigation.openDrawer()}
        >
            <Ionicons name="md-menu" size={32} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuButtonn: {
        backgroundColor: "lightgray",
        padding: 5,
        margin: 5,
    },
});
