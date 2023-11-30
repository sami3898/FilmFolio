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
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MoviesScreen" component={MoviesScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;