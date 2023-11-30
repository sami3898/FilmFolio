import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../utils/Colors";
import { END_POINTS, fetchMovies } from "../utils/ApiHelper";
import { FONTS } from "../utils/Fonts";
import CategoryTitle from "../components/CategoryTitle";
import MovieList from "../components/MovieList";
import { Movie } from "../utils/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { wp } from "../utils/ResponsiveLayout";
import CustomStatusBar from "../components/CustomStatusBar";
import HomeScreenLoader from "../components/HomeScreenLoader";

const HomeScreen = () => {

    const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
    const [popular, setPopular] = useState<Movie[]>([])
    const [topRated, setTopRated] = useState<Movie[]>([])
    const [upcoming, setUpcoming] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Navigation
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    useEffect(() => {
        
        async function fetchNowPlaying () {
            setIsLoading(true)
            let res = await fetchMovies(END_POINTS.NOW_PLAYING);
            if (res) {
                setNowPlaying(res?.results)
            }
        }
        async function fetchPopular () {
            setIsLoading(true)
            let res = await fetchMovies(END_POINTS.POPULAR);
            if (res) {
                setPopular(res?.results)
            }
        }
        async function fetchTopRated () {
            setIsLoading(true)
            let res = await fetchMovies(END_POINTS.TOP_RATED);
            if (res) {
                setTopRated(res?.results)
            }
        }
        async function fetchUpcoming () {
            setIsLoading(true)
            let res = await fetchMovies(END_POINTS.UPCOMING);
            if (res) {
                setUpcoming(res?.results)
            }
        }
        fetchNowPlaying()
        fetchPopular()
        fetchTopRated()
        fetchUpcoming()
        setTimeout(() => {
            setIsLoading(false)    
        }, 500);
        
    }, []);

    return (
        <View style={styles.container}>
            <CustomStatusBar backgroundColor={COLORS.BG_COLOR} contentType="light-content" />
            {isLoading && <HomeScreenLoader />}
            {!isLoading && <ScrollView style={{ flex: 1 }}>
                <Text style={styles.title}>Movies</Text>
                <CategoryTitle title="Now Playing" onPress={() => navigation.navigate("MoviesScreen", { title: "Now Playing", movies: nowPlaying})} />
                <MovieList movies={nowPlaying} />
                <CategoryTitle title="Popular" onPress={() => navigation.navigate("MoviesScreen", { title: "Popular", movies: popular})}/>
                <MovieList movies={popular}/>
                <CategoryTitle title="Top Rated" onPress={() => navigation.navigate("MoviesScreen", { title: "Top Rated", movies: topRated})}/>
                <MovieList movies={topRated}/>
                <CategoryTitle title="Upcoming" onPress={() => navigation.navigate("MoviesScreen", { title: "Upcoming", movies: upcoming})}/>
                <MovieList movies={upcoming}/>
            </ScrollView>}
        </View>
    );
};

export default HomeScreen;

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
});
