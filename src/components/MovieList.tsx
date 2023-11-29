import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useCallback } from "react";
import { hp, wp } from "../utils/ResponsiveLayout";
import { Movie } from "../utils/Types";
import { FONTS } from "../utils/Fonts";
import { COLORS } from "../utils/Colors";
import { Image } from 'expo-image'
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

interface MovieListProps {
    movies: Movie[];
}

const MovieList = (props: MovieListProps) => {
    const { movies } = props;

    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const _renderMovies = useCallback(
        ({ item, index }: { item: Movie; index: number }) => {
            if (index >= 10) {
                return null;
            }
            return (
                <Pressable onPress={() => navigation.navigate("MovieDetailScreen", { id: item.id })} style={styles.movieContainer}>
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                        }}
                        style={styles.moviePoster}
                        cachePolicy={"memory-disk"}
                        contentFit="cover"
                    />
                    <View style={styles.rowContainer}>
                        <Text style={styles.movieTitle}>{item.title}</Text>
                    </View>
                </Pressable>
            );
    },
    [],
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={_renderMovies}
                horizontal
                ItemSeparatorComponent={() => (
                    <View style={{ width: wp(16) }} />
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default MovieList;

const styles = StyleSheet.create({
    container: {
        marginLeft: wp(24),
        flex: 1,
        marginTop: hp(16),
        marginBottom: hp(24),
    },
    movieContainer: {
        width: wp(166),
    },
    moviePoster: {
        width: "100%",
        height: hp(240),
        borderRadius: 16,
    },
    movieTitle: {
        fontSize: wp(16),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.WHITE,
        flexWrap: "wrap",
        // width: "70%"
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp(8),
        width: wp(166),
        flexWrap: "wrap",
    },
    dateText: {
        fontSize: wp(12),
        color: COLORS.WHITE,
        fontFamily: FONTS.POPPINS_REGULAR,
        marginLeft: wp(10),
    },
});
