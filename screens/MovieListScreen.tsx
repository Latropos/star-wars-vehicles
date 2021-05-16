import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ActivityIndicator, FlatList } from "react-native";
import { Text, View } from "react-native";
import fetchAPI from "../fetchApi";
import { Movie } from "../types";
import Accordion from "react-native-collapsible/Accordion";
import { Assets } from "@react-navigation/stack";

const SECTIONS = [
    {
        title: "First",
        content: "Lorem ipsum...",
    },
    {
        title: "Second",
        content: "Lorem ipsum...",
    },
];

export default function MovieListScreen({}) {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [state, setState] = useState<Array<number>>([]);

    useEffect(() => {
        async function loadMovies() {
            const json = await fetchAPI.getMovies();
            setMovies(json);
        }
        loadMovies();
    }, []);

    const renderItem = ({ item }) => {
        return <Text>{item.title}</Text>;
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    padding: 40,
                }}
            />
            <Text style={styles.title}>Movies</Text>
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
