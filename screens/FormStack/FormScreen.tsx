import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View, TextInput, Button, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from '@react-navigation/native';

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


class FormScreen2 extends React.Component{
    private characterInput = React.createRef();

    componentDidMount(){

    }

    render(){
        return null;
    }
}

export default function FormScreen({navigation}) {
    const [character, setCharacter] = useState("");
    const [planet, setPlanet] = useState("");
    const [movie, setMovie] = useState("");
    const [validForm, setValidForm] = useState(false);

    const characterInput = useRef<TextInput>(null);
    const planetInput = useRef<TextInput>(null);
    const movieInput = useRef<TextInput>(null);

    useEffect (()=>{
        const clearData = navigation.addListener('focus', () => {
            // Screen was focused
            // Do something
                setCharacter("");
                characterInput.current?.clear();
                setPlanet("");
                planetInput.current?.clear();
                setMovie("");
                movieInput.current?.clear();
          });
            return  clearData

            
        }, [navigation])
    

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
        <HideKeyboard>
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
                <TextInput 
                    clearButtonMode="always"
                    style={styles.formField}
                    ref={characterInput}
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
                    clearButtonMode="always"
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
                    clearButtonMode="always"
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
                <TouchableOpacity
                    disabled={!validForm}
                    style={styles.button}
                    onPress={() =>
                        alert(character + "\n" + planet + "\n" + movie)
                    }
                >
                    <Text style={styles.submit}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
        </HideKeyboard>
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
