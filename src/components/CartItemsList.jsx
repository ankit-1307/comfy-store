import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemsList = () => {
    const  {cartItems}  = useSelector((store) => {
        return store.cart;
    });
    return (
        <div>
            {cartItems.map((item) => {
                return <CartItem key={item.cartID} cartItem={item} />;
            })}
        </div>
    );
};

export default CartItemsList;
