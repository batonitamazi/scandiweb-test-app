import { configureStore } from "@reduxjs/toolkit";
import {cartReducer} from '../models/application/cartSlice'
import { currencyReducer } from "../models/application/currencySlice";
import { backgroundBlurReducer } from "../models/application/modalSlice";

export const store = configureStore({
    reducer: {
        cartItems: cartReducer,
        currencies: currencyReducer,
        backgroundBlur: backgroundBlurReducer,
    },
})