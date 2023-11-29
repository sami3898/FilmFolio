import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../utils/Colors";
import { FONTS } from "../utils/Fonts";
import { hp, wp } from "../utils/ResponsiveLayout";
import { Movie } from "../utils/Types";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import CustomStatusBar from "../components/CustomStatusBar";
import AppHeader from "../components/AppHeader";
import { Image } from 'expo-image'
import { END_POINTS, fetchMovies } from "../utils/ApiHelper";
import Animated from 'react-native-reanimated'

const MoviesScreen = () => {

    //https://image.tmdb.org/t/p/original image url

    const [movies, setMovies] = useState<Movie[] | undefined>([]);
    const [title, setTitle] = useState<string | undefined>("");
    const [page, setPage] = useState<number>(1);

    const route = useRoute<RouteProp<RootStackParamList>>();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    useEffect(() => {
        setTitle(route.params?.title);
        setMovies(route.params?.movies);
    }, [route]);


    const loadMore = async() => {
        let res = []

        switch (title) {
            case "Now Playing":
                res = await fetchMovies(END_POINTS.NOW_PLAYING, page + 1)
                setPage(page + 1)
                setMovies([...movies, ...res.results])
                break;
            case "Popular":
                res = await fetchMovies(END_POINTS.POPULAR, page + 1)
                setPage(page + 1)
                setMovies([...movies, ...res.results])
                break;
            case "Top Rated":
                res = await fetchMovies(END_POINTS.TOP_RATED, page + 1)
                setPage(page + 1)
                setMovies([...movies, ...res.results])
                break;
            case "Upcoming":
                res = await fetchMovies(END_POINTS.UPCOMING, page + 1)
                setPage(page + 1)
                setMovies([...movies, ...res.results])
                break;
            default:
                break;
        }
        
    }

    const _renderMovies = ({ item, index }: { item: Movie; index: number }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.movieContainer,
                    index % 2 === 0
                        ? { paddingRight: 10 }
                        : { paddingLeft: 10 },
                ]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("MovieDetailScreen", {id: item.id})}
            >
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
            </TouchableOpacity>
        );
    };

    return (
        
        
        <View style={styles.container}>
            <CustomStatusBar
                backgroundColor={COLORS.BG_COLOR}
                contentType="light-content"
            />
            <AppHeader title={title} />
            <View>
            <FlatList
                style={{ marginHorizontal: wp(24), marginBottom: hp(26), marginTop: hp(18) }}
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={_renderMovies}
                ItemSeparatorComponent={() => (
                    <View style={{ height: wp(20) }} />
                )}
                numColumns={2}
                initialNumToRender={10}
                onEndReached={loadMore}
            />
            </View>
        </View>
    );
};

export default MoviesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG_COLOR,
    },
    title: {
        fontSize: wp(24),
        margin: wp(24),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.WHITE,
    },
    movieContainer: {
        width: "50%",
        flexGrow: 1,
        position: "relative",
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
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp(8),
        width: wp(164),
        flexWrap: "wrap",
    },
    dateText: {
        fontSize: wp(12),
        color: COLORS.WHITE,
        fontFamily: FONTS.POPPINS_REGULAR,
        marginLeft: wp(10),
    },
});
