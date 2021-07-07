import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";
import { SubmitButton } from "./SubmitButton";

export default function FormScreen() {
  const [character, setCharacter] = useState("");
  const [planet, setPlanet] = useState("");
  const [movie, setMovie] = useState("");
  const [validForm, setValidForm] = useState(false);

  const planetInput = React.createRef<TextInput>();
  const movieInput = React.createRef<TextInput>();

  function validateForm() {
    const formIsValid =
      (character != "" && planet != "") ||
      (character != "" && movie != "") ||
      (planet != "" && movie != "");
    setValidForm(formIsValid);
  }
  function focusNext(nextInput: React.RefObject<TextInput>) {
    nextInput.current?.focus();
  }

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
        <SubmitButton
          singleTapFunction={() => alert("single tap")}
          doubleTapFunction={() => alert("double tap")}
          longPressFunction={() => alert("long press")}
        />
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
