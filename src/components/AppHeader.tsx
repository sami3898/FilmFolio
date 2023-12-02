import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { hp, wp } from "../utils/ResponsiveLayout";
import { COLORS } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "../utils/Fonts";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../App";

interface AppHeaderProps {
    title: string | undefined;
}

const AppHeader = (props: AppHeaderProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <View style={styles.container}>
            <Ionicons
                name="chevron-back-outline"
                size={wp(24)}
                color={COLORS.WHITE}
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};

export default AppHeader;

const styles = StyleSheet.create({
    container: {
        height: hp(52),
        paddingHorizontal: wp(24),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.BG_COLOR,
    },
    title: {
        fontSize: wp(16),
        marginLeft: wp(12),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.WHITE,
        marginHorizontal: wp(20)
    },
});
