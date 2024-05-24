import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const themes = {
    light: "winter",
    dark: "dracula",
};
const getThemeFromLocalStorage = () => {
    const theme = localStorage.getItem("theme") || themes.light;
    document.documentElement.setAttribute("data-theme", theme);
    return theme;
};
const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;
    return user;
};
const initialState = {
    user: getUserFromLocalStorage(),
    theme: getThemeFromLocalStorage(),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const user = { ...action.payload.user, token: action.payload.jwt };
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            toast.success("Logged out successfully");
        },
        toggleTheme: (state) => {
            const { light, dark } = themes;
            state.theme = state.theme === light ? dark : light;
            localStorage.setItem("theme", state.theme);
            document.documentElement.setAttribute("data-theme", state.theme);
        },
    },
});
export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;
export default userSlice.reducer;
