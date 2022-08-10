import { createSlice } from '@reduxjs/toolkit'

const movieSlice = createSlice ({
    name: "Movie",
    initialState:{
        isVisible: false,
    },
    reducers:{
        changeVisible: (state,action) => {
            state.isVisible = !state.isVisible;
            console.log(state.isVisible);
        },
    }
})

export const { changeVisible } = movieSlice.actions;
export default movieSlice.reducer;