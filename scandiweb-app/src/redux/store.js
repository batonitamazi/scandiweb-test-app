import { configureStore } from "@reduxjs/toolkit";
import {cartReducer} from '../models/application/cartSlice'

export const store = configureStore({
    reducer: {
        cartItems: cartReducer,
    },
})