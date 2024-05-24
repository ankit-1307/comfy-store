import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import customFetch from "../utils/customFetch";

export const action =
    (store) =>
    async ({ request }) => {
        const formData = await request.formData();
        const { name, address } = Object.fromEntries(formData);
        const user = store.getState().user.user;
        const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;
        const info = {
            address,
            cartItems,
            chargeTotal: orderTotal,
            name,
            numItemsInCart,
            orderTotal: formatPrice(orderTotal),
        };

        try {
            const response = await customFetch.post(
                "/orders",
                { data: info },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            store.dispatch(clearCart());
            toast.success("order placed successfully");
            return redirect("/orders");
        } catch (error) {
            const errorMessage =
                error?.response?.data?.error?.message ||
                "there was an error placing your order";

            toast.error(errorMessage);
            if (error?.response?.status === 401 || 403)
                return redirect("/login");
        }
        return "";
    };

const CheckoutForm = () => {
    return (
        <Form method="POST" className="flex flex-col gap-y-4">
            <h4 className="font-medium text-xl">Shipping Information</h4>
            <FormInput type="text" name={"name"} label="first name" />
            <FormInput type="text" name={"address"} label="address" />
            <div className="mt-4">
                <SubmitBtn text="PLACE YOUR ORDER" />
            </div>
        </Form>
    );
};

export default CheckoutForm;
