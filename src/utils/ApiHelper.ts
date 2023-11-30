import axios from "axios";
import { Alert } from "react-native";


const BASE_URL = "https://api.themoviedb.org/3/"

export const END_POINTS = {
    NOW_PLAYING: "movie/now_playing",
    POPULAR: "movie/popular",
    TOP_RATED: "movie/top_rated",
    UPCOMING: "movie/upcoming",
    DETAILS: "movie/",
    CREDITS: "/credits",
    IMAGES: "/images?include_image_language=null"


}

const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTE1NDJiZTJlYWIyZGM3OWNhZWRhOTlhYjUzYTg3ZiIsInN1YiI6IjY1NjVjYzRkMTU2Y2M3MDEyZDU1MGQwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lrrVsmsfLWrmrCuJQVhLZrhm7-wLeXjAj2YQ78i9Hw8"

const headerObj = { headers: {
    Accept: "application/json",
    Authorization: token
}}

export const fetchMovies = async (type: string, page: number = 1) => {
    try {
        let url = BASE_URL + type + `?page=${page}`
        let response = await axios.get(url, headerObj)    
        if (response) {
            return response.data
        }
    } catch (error: any) {
        Alert.alert("Error", error.message)
    }
    
}

export const fetchMovieDetails = async (id: number) => {
    try {
        let url = BASE_URL + END_POINTS.DETAILS + id
        let response = await axios.get(url, headerObj)
        if (response) {
            return response.data
        }
    } catch (error: any) {
        Alert.alert("Error", error.message)
    }
}
export const fetchMovieCast = async (id: number) => {
    try {
        let url = BASE_URL + END_POINTS.DETAILS + id + END_POINTS.CREDITS
        let response = await axios.get(url, headerObj)
        if (response) {
            console.log(response.data)
            return response.data
        }
    } catch (error: any) {
        Alert.alert("Error", error.message)
    }
}
export const fetchMovieShots = async (id: number) => {
    try {
        let url = BASE_URL + END_POINTS.DETAILS + id + END_POINTS.IMAGES
        let response = await axios.get(url, headerObj)
        if (response) {
            console.log(response.data)
            return response.data
        }
    } catch (error: any) {
        Alert.alert("Error", error.message)
    }
}