import React, { Component } from "react";
import { Animated, StyleSheet, View, Text, StyleProp } from "react-native";

import {
  PanGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";

interface OwnProps {
  boxStyle?: StyleProp<View>;
}

export class DraggableBox extends Component<OwnProps> {
  _translateX: Animated.Value;

  constructor(props: OwnProps) {
    super(props);
    this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
    this._onGestureEvent = Animated.event([
      {
        nativeEvent: {
          translationX: this._translateX,
          translationY: this._translateY,
        },
      },
    ]);
  }
  _onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
    }
  };
  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                { translateX: this._translateX },
                { translateY: this._translateY },
              ],
            },
            this.props.boxStyle,
          ]}
        >
          {this.props.children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    alignSelf: "center",
    width: "100%",
  },
});
