import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { CartTotals, PaginationContainer, SectionTitle } from "../components";
import OrdersList from "../components/OrdersList";
import ComplexPaginationContainer from "../components/ComplexPaginationContainer";

export const loader = (store) => {
    return async ({ request }) => {
        const user = store.getState().user.user;
        if (!user) {
            toast.warn("Please login to view the orders!");
            return redirect("/login");
        }
        const url = new URL(request.url);
        const params = Object.fromEntries([...url.searchParams.entries()]);
        try {
            const response = await customFetch.get("/orders", {
                params,
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            return { orders: response.data.data, meta: response.data.meta };
        } catch (error) {
            toast.error(
                error.response?.data?.error?.message ||
                    "Sorry, no orders found!"
            );
            if (error?.response?.status === 401 || 403)
                return redirect("/login");

            return "";
        }
    };
};

const Orders = () => {
    const { orders, meta } = useLoaderData();
    if (meta.pagination.total < 1) {
        return <SectionTitle text={"Please make an order"} />;
    }
    return (
        <>
            <SectionTitle text="your orders" />
            <OrdersList />
            <ComplexPaginationContainer />
        </>
    );
};
export default Orders;
