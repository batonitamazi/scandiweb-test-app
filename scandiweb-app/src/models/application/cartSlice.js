import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: [],
}


const cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addtoCart: (state, action) => {
            const alreadyInCart = state.cartItems.find((item) => item.id === action.payload.id)
            if (alreadyInCart) {
                alreadyInCart.quantity++;
            }
            else {
                state.cartItems.push({ ...action.payload, quantity: 1 })
            }

        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id)
            item.quantity++;
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find((item) => item.id === action.payload.id)
            if(item.quantity <=1) {
                const cartItems = state.cartItems.filter((element) => element.id !== item.id)
                state.cartItems = cartItems;
            }
            item.quantity--;
        },
        // removefromCart: (state, action) => {
        //     const item = state.cartItems.find((item) => item.id === action.payload.id)
        //     if (item.quantity <= 0) {
        //         const secondItem = state.cartItems.filter((item) => item.id !== item)
        //         state.cartItems = secondItem;
        //     }
        // }
    }
})

export const { addtoCart, removefromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer