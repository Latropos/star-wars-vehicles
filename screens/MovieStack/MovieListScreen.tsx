import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Touchable } from "react-native";
import { ActivityIndicator, FlatList } from "react-native";
import { Text, View } from "react-native";
import { getMovies } from "../../utils/fetchApi";
import { Movie } from "../../utils/types";
import Accordion from "react-native-collapsible/Accordion";
import { Ionicons } from "@expo/vector-icons";

//#region detailItem
interface DetailsItemProps {
    name: string;
    value: string;
}

const DetailsItem = ({ name, value }: DetailsItemProps) => {
    return (
        <Text style={styles.content}>
            {name}: {value}
        </Text>
    );
};

////#endregion

//#region MovieListScreen
export default function MovieListScreen({ navigation }: any) {
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [state, setState] = useState<Array<number>>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        async function loadMovies() {
            setErrorMessage("");
            try {
                const json = await getMovies();
                setMovies(json);
            } catch (err) {
                setErrorMessage("Sorry, we can't fetch your API");
            }
        }
        loadMovies();
    }, []);

    const MovieDescription = ({ movie }: any) => {
        return (
            <View style={styles.contentContainer}>
                <DetailsItem name="Director" value={movie.director} />
                <DetailsItem name="Producer" value={movie.producer} />
                <DetailsItem name="Release date" value={movie.release_date} />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("Animation", {
                            opening_crawl: movie.opening_crawl,
                        })
                    }
                >
                    <Text>Watch intro</Text>
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            {errorMessage ? <Text> {errorMessage}</Text> : <Text></Text>}

            {!movies ? (
                <ActivityIndicator />
            ) : (
                <Accordion
                    containerStyle={styles.accordion}
                    sections={movies}
                    activeSections={state}
                    renderHeader={(movie) => (
                        <Text style={styles.header}>{movie.title}</Text>
                    )}
                    renderContent={(movie: Movie) => (
                        <MovieDescription movie={movie} />
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

//#region styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    header: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold",
        margin: -1,
        backgroundColor: "cornflowerblue",
        padding: 8,
        paddingLeft: 20,
        borderColor: "navy",
        borderWidth: 3,
    },
    content: {
        color: "gold",
        backgroundColor: "navy",
        padding: 5,
    },
    accordion: {
        marginHorizontal: "7%",
        width: "86%",
    },
    button: {
        backgroundColor: "wheat",
        padding: 10,
        borderRadius: 5,
    },

    contentContainer: {},
});
//#endregion
