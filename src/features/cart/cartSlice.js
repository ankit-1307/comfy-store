import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0,
};
const getCartFromLocalStorage = () => {
    return localStorage.getItem("cart");
};

const cartSlice = createSlice({
    name: "cart",
    initialState: JSON.parse(getCartFromLocalStorage()) || defaultState,
    reducers: {
        addItem: (state, action) => {
            const { product } = action.payload;
            const item = state.cartItems.find(
                (i) => i.cartID === product.cartID
            );
            if (item) {
                item.amount += product.amount;
            } else {
                state.cartItems.push(product);
            }
            state.cartTotal += product.price * product.amount;
            state.numItemsInCart += product.amount;
            state.tax = 0.18 * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            cartSlice.caseReducers.calculateShipping(state);
            localStorage.setItem("cart", JSON.stringify(state));
            toast.success("item added successfully!");
        },
        clearCart: (state) => {
            localStorage.setItem("cart", JSON.stringify(defaultState));
            return defaultState;
        },
        removeItem: (state, action) => {
            const { cartID } = action.payload;
            const product = state.cartItems.find((i) => i.cartID === cartID);
            const remainingProduct = state.cartItems.filter(
                (item) => item.cartID !== cartID
            );
            state.numItemsInCart -= product.amount;
            state.cartTotal -= product.price * product.amount;
            state.cartItems = remainingProduct;
            cartSlice.caseReducers.calculateShipping(state);
            cartSlice.caseReducers.calculateTotals(state);
            localStorage.setItem("cart", JSON.stringify(state));
            toast.error("items removed!");
        },
        editItem: (state, action) => {
            const { cartID, amount } = action.payload;

            const item = state.cartItems.find((i) => i.cartID === cartID);
            state.numItemsInCart += amount - item.amount;
            state.cartTotal += item.price * (amount - item.amount);
            item.amount = amount;
            cartSlice.caseReducers.calculateShipping(state);
            cartSlice.caseReducers.calculateTotals(state);
        },
        calculateTotals: (state) => {
            state.tax = 0.18 * state.cartTotal;
            state.orderTotal =
                state.cartTotal +
                state.tax +
                (state.shipping ? state.shipping : 0);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        calculateShipping: (state) => {
            const shippingProducts = state.cartItems.map(
                (i) => i.shipping == true
            );
            if (shippingProducts.length == null) {
                state.shipping = false;
            }
        },
    },
});
export const {
    clearCart,
    editItem,
    addItem,
    removeItem,
    calculateTotals,
    calculateShipping,
} = cartSlice.actions;
export default cartSlice.reducer;
