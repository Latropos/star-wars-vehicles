import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  State,
  LongPressGestureHandlerStateChangeEvent,
  TapGestureHandlerStateChangeEvent,
} from "react-native-gesture-handler";
import { DraggableBox } from "./DraggableBox";

export default function FormScreen() {
  const [character, setCharacter] = useState("");
  const [planet, setPlanet] = useState("");
  const [movie, setMovie] = useState("");
  const [validForm, setValidForm] = useState(false);

  const planetInput = React.createRef();
  const movieInput = React.createRef();

  function validateForm() {
    const formIsValid =
      (character != "" && planet != "") ||
      (character != "" && movie != "") ||
      (planet != "" && movie != "");
    setValidForm(formIsValid);
  }
  function focusNext(nextInput) {
    nextInput.current.focus();
  }

  //#region Gesture hanlders
  const doubleTapRef = React.createRef<TapGestureHandler>();
  const tripleTapRef = React.createRef<TapGestureHandler>();

  const onHandlerStateChange = (
    event: LongPressGestureHandlerStateChangeEvent
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("Long press");
    }
  };
  const onSingleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("Single tap");
    }
  };
  const onDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("Double tap");
    }
  };
  const onTrippleTap = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("Tripple tap");
    }
  };
  //#endregion
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "flex-start" }}>
        <TextInput
          style={styles.formField}
          autoFocus={true}
          placeholder="Favourite character"
          returnKeyType="next"
          autoCapitalize="words"
          onSubmitEditing={() => focusNext(planetInput)}
          onChangeText={(text) => {
            setCharacter(text);
            validateForm();
          }}
        />
        <TextInput
          style={styles.formField}
          ref={planetInput}
          autoFocus={true}
          placeholder="Favourite planet"
          returnKeyType="next"
          onSubmitEditing={() => focusNext(movieInput)}
          onChangeText={(text) => {
            setPlanet(text);
            validateForm();
          }}
        />
        <TextInput
          style={styles.formField}
          ref={movieInput}
          autoFocus={true}
          placeholder="Favourite movie"
          returnKeyType="done"
          onChangeText={(text) => {
            setMovie(text);
            validateForm();
          }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
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
