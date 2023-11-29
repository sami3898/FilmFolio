import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { wp } from '../utils/ResponsiveLayout'
import { FONTS } from '../utils/Fonts';
import { COLORS } from '../utils/Colors';
import { Ionicons  } from '@expo/vector-icons'

interface CategoryTitleProps {
    title: string;
    onPress: () => void;
}

const CategoryTitle = (props: CategoryTitleProps) => {
    
    const { title, onPress } = props

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.rowContainer} onPress={() => onPress()}>
        <Text style={styles.seeAllText}>See all</Text>  
        <Ionicons 
            name='chevron-forward-outline'
            size={wp(12)}
            color={COLORS.CYAN_BLUE}
            style={{ marginLeft: wp(4) }}
        />
      </TouchableOpacity>
      
    </View>
  )
}

export default CategoryTitle

const styles = StyleSheet.create({
    container: {
        marginHorizontal: wp(24),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
        
    },
    titleText: {
        fontSize: wp(20),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.WHITE
    },
    seeAllText: {
        fontSize: wp(12),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.CYAN_BLUE
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})