import { createSlice } from '@reduxjs/toolkit'

const movieSlice = createSlice ({
    name: "Movie",
    initialState:{
        isVisible: false,
        isMap:'none'
    },
    reducers:{
        changeVisible: (state,action) => {
            state.isVisible = !state.isVisible;
        },
        changeMapVisible: (state,action) => {
            state.isMap = 'block';
        },
    }
})

export const { changeVisible,changeMapVisible } = movieSlice.actions;
export default movieSlice.reducer;