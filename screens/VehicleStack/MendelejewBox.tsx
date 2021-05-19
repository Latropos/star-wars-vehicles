import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface DetailsItemProps {
    name: string;
    value: string;
}

export default function MendelejewBox({ name, value }: DetailsItemProps) {
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
                styles.box,
                {
                    opacity: _animationValue,
                    transform: [
                        {
                            scale: _animationValue.interpolate({
                                inputRange: [0, 0.25, 0.5, 0.75, 1],
                                outputRange: [0.9, 1.05, 1.1, 1.05, 1],
                            }),
                        },
                    ],
                },
            ]}
        >
            {value == "unknown" ? (
                <Text style={{ fontSize: 40 }}>?</Text>
            ) : (
                <View>
                    {value.length > 4 ? (
                        <Text style={{ fontSize: 28 }}>{value}</Text>
                    ) : (
                        <Text style={{ fontSize: 40 }}>{value}</Text>
                    )}
                </View>
            )}
            <Text style={styles.boxLabel}>{name}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        borderColor: "steelblue",
        borderWidth: 3,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "skyblue",
    },
    boxLabel: {
        fontSize: 12,
    },
});
