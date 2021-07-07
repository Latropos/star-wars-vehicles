import React, { useEffect, useState, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { TweenLite } from "gsap";

export default function Animation({ navigation, route }: any) {
  const _animationValue = new Animated.Value(0);
  let opening_crawl: string = route.params.opening_crawl;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(_animationValue, {
        toValue: 1,
        duration: 30000,
        useNativeDriver: true, //
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          transform: [
            { rotateX: "75deg" },
            {
              perspective: 150,
            },
          ],
        }}
      >
        <Animated.View
          style={{
            opacity: _animationValue.interpolate({
              inputRange: [0, 0.75, 1],
              outputRange: [1, 1, 0],
            }),
            transform: [
              {
                translateY: _animationValue.interpolate({
                  inputRange: [0, 0.75, 1],
                  outputRange: [420, -100, -700],
                }),
              },
            ],
          }}
        >
          <Text style={styles.crawl}>{route.params.opening_crawl}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  textPanel: {},
  crawl: {
    color: "gold",
    fontSize: 15,
  },
});
