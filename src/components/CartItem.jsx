import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../features/cart/cartSlice";
import { GenerateAmountOptions, formatPrice } from "../utils";

const CartItem = ({ cartItem }) => {
    const { cartID, title, amount, productColor, company, image, price } = cartItem;
    const dispatch = useDispatch();

    const handleAmount = (e) => {
        dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
    };
    const removeItemFromTheCart = () => {
        dispatch(removeItem({ cartID }));
    };

    return (
        <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0 ">
            {/* IMAGE */}
            <img
                src={image}
                alt={title}
                className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32"
            />
            {/* INFO */}
            <div className="sm:ml-16 sm:w-48">
                <h3 className="capitalize font-medium">{title}</h3>
                <h4 className="mt-2 capitalize text-sm text-neutral-content">
                    {company}
                </h4>
                <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                    color :
                    <span
                        className="badge badge-sm"
                        style={{ backgroundColor: productColor }}
                    ></span>
                </p>
            </div>
            <div className="sm:ml-12">
                <div className="form-control max-w-xs">
                    <label htmlFor="amount" className="label">
                        <span className="label-text">Amount</span>
                    </label>
                    <select
                        name="amount"
                        id="amount"
                        value={amount}
                        className="select mt-2 select-base select-bordered select-xs"
                        onChange={handleAmount}
                    >
                        <GenerateAmountOptions number={amount + 5} />
                    </select>
                </div>
                <button
                    className="mt-2 link link-primary link-hover text-sm"
                    onClick={removeItemFromTheCart}
                >
                    remove
                </button>
            </div>
            {/* PRICE */}
            <p className="sm:ml-auto font-medium">{formatPrice(price)}</p>
        </article>
    );
};

export default CartItem;
