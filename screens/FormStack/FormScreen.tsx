import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FormScreen() {
    const [character, setCharacter] = useState("");
    const [planet, setPlanet] = useState("");
    const [movie, setMovie] = useState("");

    const planetInput = React.createRef();
    const movieInput = React.createRef();

    function focusNext(nextInput) {
        nextInput.current.focus();
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
                    onChangeText={(text) => setCharacter(text)}
                />
                <TextInput
                    style={styles.formField}
                    ref={planetInput}
                    autoFocus={true}
                    placeholder="Favourite planet"
                    returnKeyType="next"
                    onSubmitEditing={() => focusNext(movieInput)}
                    onChangeText={(text) => setPlanet(text)}
                />
                <TextInput
                    style={styles.formField}
                    ref={movieInput}
                    autoFocus={true}
                    placeholder="Favourite movie"
                    returnKeyType="done"
                    onChangeText={(text) => setMovie(text)}
                />
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        alert(character + "\n" + planet + "\n" + movie)
                    }
                >
                    <Text style={styles.submit}>Submit</Text>
                </TouchableOpacity>
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
