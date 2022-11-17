import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    backgroundBlur: false
}
const backgroundBlurSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        addBackgroundBlur: (state, action) => {
            state.backgroundBlur = !action.payload
        },
    }

})
export const { addBackgroundBlur, removeBackgroundBlur } = backgroundBlurSlice.actions;
export const backgroundBlurReducer = backgroundBlurSlice.reducer;