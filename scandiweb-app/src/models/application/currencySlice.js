import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currencies: [],
    activeCurrency: [],
}
const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        addCurrencies: (state, action) => {
            const currencies = action.payload
            const modifiedCurrencies = currencies.map(obj => ({...obj, isActive: false}))
            modifiedCurrencies[0].isActive = true
            state.activeCurrency.push(modifiedCurrencies[0])
            state.currencies.push(modifiedCurrencies)
        },
        activeCurrency: (state, action) => {
            state.currencies[0].forEach((element) => 
                element.isActive = false
            )
            state.activeCurrency.pop();
            const setActive = state.currencies[0].find((item) => item.label === action.payload.label)
            if(setActive){
                setActive.isActive = true;
            }
            state.activeCurrency.push(setActive)
        }
    }
})
export const { activeCurrency, addCurrencies } = currenciesSlice.actions;
export const currencyReducer = currenciesSlice.reducer;