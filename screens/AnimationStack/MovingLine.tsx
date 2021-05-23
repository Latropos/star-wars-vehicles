import React, { useEffect } from "react";
import { AppRegistry, StyleSheet, Text, View, Animated } from "react-native";

export default function MovingLine() {
    const _moveAnimationValue = new Animated.Value(0);
    const _opacityAnimationValue = new Animated.Value(0);
    const _approximatedDeviceHeight = 500;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(_moveAnimationValue, {
                    toValue: _approximatedDeviceHeight / 4,
                    duration: 1500,
                    useNativeDriver: true, //
                }),
                Animated.timing(_opacityAnimationValue, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true, //
                }),
            ]),

            Animated.parallel([
                Animated.timing(_moveAnimationValue, {
                    toValue: _approximatedDeviceHeight * (3 / 4),
                    duration: 3000,
                    useNativeDriver: true, //
                }),
            ]),

            Animated.parallel([
                Animated.timing(_moveAnimationValue, {
                    toValue: _approximatedDeviceHeight,
                    duration: 1500,
                    useNativeDriver: true, //
                }),
                Animated.timing(_opacityAnimationValue, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true, //
                }),
            ]),
        ]).start();
    }, []);

    return (
        <View>
            <Animated.View
                style={[
                    styles.box,
                    {
                        opacity: _opacityAnimationValue,
                        transform: [{ translateY: _moveAnimationValue }],
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: "red",
        position: "absolute",
        top: 100,
        left: 100,
        width: 100,
        height: 100,
    },
});
