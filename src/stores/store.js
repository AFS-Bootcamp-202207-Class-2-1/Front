import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "../components/MovieSlice";

const store = configureStore({
    reducer: {
        movies: MovieSlice
    }
})

export default store;