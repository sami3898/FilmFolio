import React from "react";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold} from '@expo-google-fonts/poppins'
import 'react-native-reanimated'

// Screens
import HomeScreen from './src/screens/HomeScreen'
import MoviesScreen from './src/screens/MoviesScreen'
import MovieDetailScreen from './src/screens/MovieDetailScreen'
import { Movie } from "./src/utils/Types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "./src/components/CustomTabBar";
import { COLORS } from "./src/utils/Colors";
import { Ionicons } from '@expo/vector-icons'
import { wp } from "./src/utils/ResponsiveLayout";

export type RootStackParamList = {
  Home: undefined,
  MoviesScreen: {
    title: string,
    movies: Movie[]
  },
  MovieDetailScreen: {
    id: number
  }
}


const Stack = createNativeStackNavigator<RootStackParamList>()

const Tab = createBottomTabNavigator()

const tabIcon = (route: any,color: string) => {
  let icon: any;
  switch(route.name) {
    case "Home":
      icon = "home"
      break;
    case "My List":
      icon = "list"
      break;
    case "Liked":
      icon = "heart"
        break;
    default:
      icon = "home"
      break;
  }
  return <Ionicons name={icon} color={color} size={wp(24)} />
}

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={(({route}) => ({
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
          paddingVertical: 20
        },
        tabBarActiveTintColor: COLORS.CYAN_BLUE,
        tabBarInactiveTintColor: "#fff",
        tabBarIcon:({color}) => tabIcon(route,color),
        tabBarShowLabel: false
      }))}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />
      <Tab.Screen name="My List" component={HomeScreen} options={{ headerShown: false}} />
      <Tab.Screen name="Liked" component={HomeScreen} options={{ headerShown: false}} />
    </Tab.Navigator>
  )
}

const App = () => {

  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
  })

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabStack} options={{ headerShown: false }} />
        <Stack.Screen name="MoviesScreen" component={MoviesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;