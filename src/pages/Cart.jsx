import { useSelector } from "react-redux";
import { CartItemsList, CartTotals, SectionTitle } from "../components";
import { Link } from "react-router-dom";

const Cart = () => {
    const { numItemsInCart } = useSelector((state) => {
        return state.cart;
    });
    const user = useSelector((state) => {
        return state.user.user;
    });
    if (!numItemsInCart) {
        return <SectionTitle text={"Cart is empty"} />;
    }
    return (
        <>
            <SectionTitle text={"Shopping Cart"} />
            <div className="grid mt-8 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <CartItemsList />
                </div>
                <div className="lg:col-span-4 lg:pl-4">
                    <CartTotals />
                    {user ? (
                        <Link
                            to="/checkout"
                            className="btn btn-primary btn-block mt-8"
                        >
                            PROCEED TO CHECKOUT
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="btn btn-primary btn-block mt-8"
                        >
                            LOGIN
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
