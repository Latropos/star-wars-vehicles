import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Vehicle } from "../../types";
import fetchAPI from "../../fetchApi";
import MendelejewBox from "./MendelejewBox";

interface DetailsItemProps {
    name: string;
    value: string;
}

export default function DetailsItem({ name, value }: DetailsItemProps) {
    const _animationValue = new Animated.Value(0);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(_animationValue, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true, //
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.detailsItem,
                {
                    transform: [
                        {
                            rotateY: _animationValue.interpolate({
                                inputRange: [0, 0.25, 0.75, 1],
                                outputRange: [
                                    "-180deg",
                                    "-150deg",
                                    "-30deg",
                                    "0deg",
                                ],
                            }),
                        },
                        {
                            rotateX: "60deg",
                        },
                        {
                            perspective: 2000,
                        },
                    ],
                },
            ]}
        >
            <Text style={styles.listItem}>
                {name}: {value}
            </Text>
        </Animated.View>
    );
}
const styles = StyleSheet.create({
    listItem: {
        fontSize: 20,
    },
    detailsItem: {
        padding: 10,
        borderRadius: 5,
        margin: 25,
        backgroundColor: "lightcyan",
        borderColor: "teal",
        borderWidth: 2,
    },
});
