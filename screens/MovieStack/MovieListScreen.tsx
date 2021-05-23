import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator, FlatList } from "react-native";
import { Text, View } from "react-native";
import fetchAPI from "../../fetchApi";
import { Movie } from "../../types";
import Accordion from "react-native-collapsible/Accordion";
import { Ionicons } from "@expo/vector-icons";

//#region -------------------------------------------------
export default function MovieListScreen({ navigation }) {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [state, setState] = useState<Array<number>>([]);
    const [errorMessage, setErrorMessage] = useState<string>(undefined);

    useEffect(() => {
        async function loadMovies() {
            setErrorMessage(undefined);
            try {
                const json = await fetchAPI.getMovies();
                setMovies(json);
            } catch (err) {
                setErrorMessage("Sorry, we can't fetch your API");
            }
        }
        loadMovies();
    }, []);

    return (
        <View style={styles.container}>
            {errorMessage ? <Text> {errorMessage}</Text> : <Text></Text>}

            {!movies ? (
                <ActivityIndicator />
            ) : (
                <Accordion
                    sections={movies}
                    activeSections={state}
                    renderHeader={(movie) => (
                        <Text style={styles.header}>{movie.title}</Text>
                    )}
                    renderContent={(movie) => (
                        <Text style={styles.content}>
                            {movie.opening_crawl}
                        </Text>
                    )}
                    onChange={(activeSections) => {
                        setState(activeSections);
                    }}
                />
            )}
        </View>
    );
}
//#endregion

//region---------------styles-------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    header: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        backgroundColor: "cornflowerblue",
        padding: 5,
        borderColor: "navy",
        borderWidth: 3,
    },
    content: {
        color: "gold",
        backgroundColor: "navy",
        padding: 5,
    },
});
//endregion
