import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function Animation() {
    const _animationValue = new Animated.Value(0);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(_animationValue, {
                toValue: 1,
                duration: 6000,
                useNativeDriver: true, //
            }),
        ]).start();
    }, []);
    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.textPanel,
                    {
                        transform: [
                            {
                                translateY: _animationValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [50, -150],
                                }),
                            },
                            {
                                rotateX: "45deg",
                            },
                            {
                                scale: _animationValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0],
                                }),
                            },
                            {
                                scaleY: 2,
                            },
                            {
                                perspective: _animationValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [100, 150],
                                }),
                            },
                        ],
                    },
                ]}
            >
                <Text style={styles.crawl}>
                    It is a period of civil war. \r\nRebel spaceships,
                    striking\r\nfrom a hidden base, have won\r\ntheir first
                    victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring
                    the battle, Rebel\r\nspies managed to steal secret\r\nplans
                    to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an
                    armored space\r\nstation with enough power\r\nto destroy an
                    entire planet.\r\n\r\nPursued by the Empire's\r\nsinister
                    agents, Princess\r\nLeia races home aboard her\r\nstarship,
                    custodian of the\r\nstolen plans that can save her\r\npeople
                    and restore\r\nfreedom to the galaxy....
                </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "midnightblue",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: 20,
    },
    textPanel: {},
    crawl: {
        color: "gold",
        fontSize: 15,
    },
});
