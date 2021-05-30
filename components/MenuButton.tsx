import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MenuButton({ navigation }: any) {
    return (
        <TouchableOpacity
            style={styles.menuButtonn}
            onPress={() => {
                navigation.openDrawer();
            }}
        >
            <Ionicons name="md-menu" size={32} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuButtonn: {
        backgroundColor: "gainsboro",
        padding: 0,
        margin: 5,
    },
});
