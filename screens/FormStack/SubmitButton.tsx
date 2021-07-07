import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  State,
  LongPressGestureHandlerStateChangeEvent,
  TapGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { DraggableBox } from "./DraggableBox";

interface Props {
  singleTapFunction: () => void;
  doubleTapFunction: () => void;
  longPressFunction: () => void;
}

// export function SubmitButton({singleTapFunction: () => void) {
export function SubmitButton({
  singleTapFunction,
  doubleTapFunction,
  longPressFunction,
}: Props) {
  const doubleTapRef = React.createRef<TapGestureHandler>();

  function onHandlerStateChange(
    event: LongPressGestureHandlerStateChangeEvent
  ) {
    if (event.nativeEvent.state === State.ACTIVE) {
      longPressFunction();
    }
  }
  function onSingleTap(event: TapGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.state === State.ACTIVE) {
      singleTapFunction();
    }
  }
  function onDoubleTap(event: TapGestureHandlerStateChangeEvent) {
    if (event.nativeEvent.state === State.ACTIVE) {
      doubleTapFunction();
    }
  }

  return (
    <View>
      <LongPressGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        minDurationMs={800}
      >
        <TapGestureHandler
          onHandlerStateChange={onSingleTap}
          waitFor={doubleTapRef}
          numberOfTaps={1}
        >
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={onDoubleTap}
            numberOfTaps={2}
          >
            <DraggableBox>
              <View style={styles.button}>
                <Text style={styles.submit}>Submit</Text>
              </View>
            </DraggableBox>
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  formField: {
    height: 50,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 2,
    backgroundColor: "papayawhip",
    fontSize: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "steelblue",
    height: 50,
    justifyContent: "center",
    borderRadius: 5,
  },
  submit: {
    color: "aliceblue",
    textAlign: "center",
    fontSize: 20,
  },
});
