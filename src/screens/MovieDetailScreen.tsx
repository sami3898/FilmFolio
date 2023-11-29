import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../utils/Colors";
import CustomStatusBar from "../components/CustomStatusBar";
import { Cast, CastDetails, Genre, MovieDetails } from "../utils/Types";
import { fetchMovieCast, fetchMovieDetails } from "../utils/ApiHelper";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import AppHeader from "../components/AppHeader";
import { Image } from "expo-image";
import { DEVICE_HEIGHT, DEVICE_WIDTH, hp, wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
    Easing,
    FadeIn,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const MovieDetailScreen = () => {
    const [movieDetails, setMovieDetails] = useState<MovieDetails>();
    const [castDetails, setCastDetails] = useState<CastDetails>();
    const [detailsSelectedIndex, setDeatilsSelectedIndex] = useState<number>(0);

    const route = useRoute<RouteProp<RootStackParamList>>();

    useEffect(() => {
        //@ts-ignore
        const id = route.params?.id;

        async function fetchDetails() {
            let res = await fetchMovieDetails(id);
            setMovieDetails(res);
        }
        async function fetchCastetails() {
            let res = await fetchMovieCast(id);
            setCastDetails(res);
        }
        fetchDetails();
        fetchCastetails()
    }, []);

    const convertTime = (runTime: number) => {
        const hours = Math.floor(runTime / 60);
        const minutes = runTime % 60;
        return `${hours}h ${minutes}min `;
    };

    const translateY = useSharedValue(DEVICE_HEIGHT);
    const opacity = useSharedValue(0);
    const animatedStytle = useAnimatedStyle(() => ({
        transform: [
            { translateY: withTiming(translateY.value, { duration: 700 }) },
        ],
        opacity: withDelay(200, withTiming(opacity.value, { duration: 500 })),
    }));

    useEffect(() => {
        translateY.value = 1;
        opacity.value = 1;
    }, []);

    const buttonTranslateX = useSharedValue((DEVICE_WIDTH - wp(52)) / 3);
    const detailsSelectionAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withTiming(
                    detailsSelectedIndex * buttonTranslateX.value,
                    { duration: 300, easing: Easing.linear }
                ),
            },
        ],
        left: detailsSelectedIndex == 0 ? 3 : detailsSelectedIndex == 1 ? 4 : 0,
    }));


    const renderGenreList = (list: Genre[]) => {
        return list?.map((e: Genre, i: number) => {
            return (
                
                    <LinearGradient
                        style={[styles.genreContainer, i > 0 && { marginLeft: wp(6)}]}
                        colors={["#43A8D4", "#3b5998", "#3F377F"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={[styles.detailsItemText, { fontFamily: FONTS.POPPINS_REGULAR}]}>{e.name}</Text>
                    </LinearGradient>
                
            );
        })
    }


    const _renderCastList = ({ item, index }: { item: Cast; index: number }) => {
        return (
            <View style={styles.castContainer}>
                <LinearGradient
                    style={{ height: wp(60), width: wp(60), borderRadius: 60, justifyContent: 'center', alignItems: 'center'}}
                    colors={["#43A8D4", "#3b5998", "#3F377F"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Image 
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`}}
                    style={styles.profilePhoto}
                    cachePolicy={"memory-disk"}
                    contentFit="cover"
                />
                </LinearGradient>
                <View>
                    <Text style={styles.castName}>{item.original_name}</Text>
                    <Text style={[styles.castName, { fontFamily: FONTS.POPPINS_REGULAR}]}>{item.character}</Text>
                </View>
                
            </View>
        )
    }

    const renderCast = () => {
        
        return (
            <FlatList 
                data={castDetails?.cast}
                keyExtractor={item => item.id.toString()}
                renderItem={_renderCastList}
                nestedScrollEnabled={true}
                style={{ marginHorizontal: wp(24)}}
                initialNumToRender={10}
                maxToRenderPerBatch={20}
                // ItemSeparatorComponent={() => {return <View style={{height: hp(12)}} />}}

            />
        )
    }

    const renderOverview = () => {
        return (
            <View style={styles.overViewContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.infoText}>
                            {`Budget: $${movieDetails?.budget.toLocaleString()}`}
                        </Text>
                        <Ionicons
                            name="cash-outline"
                            size={wp(16)}
                            color={COLORS.MAXIMUM_BLUE}
                            style={{ marginLeft: wp(8) }}
                        />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.infoText}>
                            {`Revenue: $${movieDetails?.revenue.toLocaleString()}`}
                        </Text>
                        <Ionicons
                            name="cash-outline"
                            size={wp(16)}
                            color={COLORS.MAXIMUM_BLUE}
                            style={{ marginLeft: wp(8) }}
                        />
                    </View>
                    <Text style={[styles.title, { fontFamily: FONTS.POPPINS_REGULAR, marginTop: hp(16)}]}>Genre</Text>
                    <View style={[styles.rowContainer, { flexWrap: 'wrap', justifyContent: 'flex-start'}]}>
                        {renderGenreList(movieDetails?.genres!)}    
                    </View>
                    <Text style={[styles.title, { fontFamily: FONTS.POPPINS_REGULAR, marginTop: hp(16)}]}>Overview</Text>
                    <Text style={styles.infoText}>{movieDetails?.overview}</Text>
                    
                </View>
        )
    }

    const renderView = () => {
        switch (detailsSelectedIndex) {
            case 0:
                return renderOverview()
            case 1:
                return renderCast()
            default:
                break;
        }
    }
    return (
        <View style={styles.container}>
            <CustomStatusBar
                contentType="light-content"
                backgroundColor={COLORS.BG_COLOR}
            />
            <AppHeader title="" />
            <ScrollView nestedScrollEnabled={true} style={[{ flex: 1 }]}>
                <Animated.View style={animatedStytle}>
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`,
                    }}
                    style={styles.posterImage}
                    cachePolicy={"memory-disk"}
                    contentFit="fill"
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{movieDetails?.title}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.infoText}>
                            {movieDetails?.release_date}
                        </Text>
                        <Ionicons
                            name="calendar-outline"
                            size={wp(16)}
                            color={COLORS.MAXIMUM_BLUE}
                            style={{ marginLeft: wp(8) }}
                        />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.infoText}>
                            {convertTime(movieDetails?.runtime!)}
                        </Text>
                        <Ionicons
                            name="time-outline"
                            size={wp(16)}
                            color={COLORS.MAXIMUM_BLUE}
                            style={{ marginLeft: wp(8) }}
                        />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.infoText}>{`${Math.round(
                            movieDetails?.vote_average!
                        ).toPrecision(2)}/10`}</Text>
                        <Ionicons
                            name="star-outline"
                            size={wp(16)}
                            color={COLORS.MAXIMUM_BLUE}
                            style={{ marginLeft: wp(8) }}
                        />
                    </View>
                </View>
                <LinearGradient
                    style={styles.detailsContainer}
                    colors={["#43A8D4", "#3b5998", "#3F377F"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Animated.View
                        style={[
                            styles.aniamtedViewStyle,
                            detailsSelectionAnimatedStyle,
                        ]}
                    />
                    <Pressable
                        onPress={() => setDeatilsSelectedIndex(0)}
                        style={styles.detailsSelectionContainer}
                    >
                        <Text style={styles.detailsItemText}>Details</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setDeatilsSelectedIndex(1)}
                        style={styles.detailsSelectionContainer}
                    >
                        <Text style={styles.detailsItemText}>Casts</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setDeatilsSelectedIndex(2)}
                        style={styles.detailsSelectionContainer}
                    >
                        <Text style={styles.detailsItemText}>Shots</Text>
                    </Pressable>
                </LinearGradient>
                
                {renderView()}
                </Animated.View>
                
            </ScrollView>
        </View>
    );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BG_COLOR,
    },
    posterImage: {
        width: DEVICE_WIDTH - wp(34),
        height: hp(400),
        marginVertical: hp(24),
        alignSelf: "center",
        borderRadius: 16,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp(24),
    },
    title: {
        fontSize: wp(24),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.WHITE,
    },
    infoContainer: {
        marginVertical: hp(24),
        marginHorizontal: wp(24),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoText: {
        fontSize: wp(14),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.WHITE,
    },
    detailsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: wp(24),
        height: hp(44),
        borderRadius: 16,
        padding: 2,
    },
    detailsSelectionContainer: {
        width: (DEVICE_WIDTH - wp(48)) / 3,
        // backgroundColor: COLORS.BLACK,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        height: "100%",
    },
    detailsItemText: {
        fontSize: wp(14),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.WHITE,
    },
    aniamtedViewStyle: {
        width: (DEVICE_WIDTH - wp(50)) / 3,
        position: "absolute",
        backgroundColor: COLORS.BLACK,
        height: "100%",
        borderRadius: 16,
    },
    overViewContainer: {
        marginHorizontal: wp(24),
        marginVertical: hp(24),
    },
    genreContainer: {
        paddingHorizontal: wp(16),
        paddingVertical: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: hp(8)
    },
    profilePhoto: {
        height: wp(54),
        width: wp(54),
        borderRadius: 60
    },
    castContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: hp(12)
    },
    castName: {
        fontSize: wp(14),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.WHITE,
        marginLeft: wp(12)
    }
});
