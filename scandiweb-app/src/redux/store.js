import { configureStore } from "@reduxjs/toolkit";
import {cartReducer} from '../models/application/cartSlice'
import { currencyReducer } from "../models/application/currencySlice";

export const store = configureStore({
    reducer: {
        cartItems: cartReducer,
        currencies: currencyReducer,
    },
})