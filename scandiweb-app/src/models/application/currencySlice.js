import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currencies: [],
}
const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        addCurrencies: (state, action) => {
            state.currencies.push(action.payload)
        },
        activeCurrency: (state, action) => {
            const activeCurrency = state.currencies.find((item) => item.label === action.payload.label)
            activeCurrency.active = true;
        }
    }
})
export const { activeCurrency, addCurrencies } = currenciesSlice.actions;
export const currencyReducer = currenciesSlice.reducer;