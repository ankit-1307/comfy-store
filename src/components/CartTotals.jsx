import { useSelector } from "react-redux";
import { formatPrice } from "../utils";

const CartTotals = () => {
    const { orderTotal, cartTotal, shipping, tax } = useSelector((state) => {
        return state.cart;
    });
    return (
        <div className="card bg-base-200">
            <div className="card-body">
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                    <span>Subtotal</span>
                    <span className="font-medium">
                        {formatPrice(cartTotal)}
                    </span>
                </p>
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                    <span>Shipping</span>
                    <span className="font-medium">{formatPrice(shipping)}</span>
                </p>
                <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                    <span>Tax</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                </p>
                {/* ORDER TOTAL */}
                <p className="flex justify-between text-md mt-4 pb-2">
                    <span className="font-md font-normal">Order</span>
                    <span className="font-md font-normal">
                        {formatPrice(orderTotal)}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default CartTotals;
