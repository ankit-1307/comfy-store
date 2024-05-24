import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
    About,
    Cart,
    Checkout,
    Error,
    HomeLayout,
    Landing,
    Login,
    Orders,
    Products,
    Register,
    SingleProduct,
} from "./pages";
import { ErrorElement } from "./components";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as getAllProductsLoader } from "./pages/Products";
import { loader as ordersLoader } from "./pages/Orders";
import { loader as checkOutLoader } from "./pages/Checkout";
import { action as registerUser } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import store from "../store";
import { action as checkOutAction } from "./components/CheckoutForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                loader: landingLoader,
                element: <Landing />,
                errorElement: <ErrorElement />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "products",
                loader: getAllProductsLoader,
                errorElement: <ErrorElement />,
                element: <Products />,
            },
            {
                path: "products/:id",
                loader: singleProductLoader,
                errorElement: <ErrorElement />,
                element: <SingleProduct />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "checkout",
                loader: checkOutLoader(store),
                action: checkOutAction(store),
                element: <Checkout />,
            },
            {
                path: "orders",
                element: <Orders />,
                loader: ordersLoader(store),
            },
        ],
    },
    {
        path: "/login",
        action: loginAction(store),
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: "/register",
        action: registerUser,
        element: <Register />,
        errorElement: <Error />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
