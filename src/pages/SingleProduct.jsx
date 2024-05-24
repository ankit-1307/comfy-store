import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { GenerateAmountOptions, formatPrice } from "../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

export const loader = async ({ params }) => {
    const { id } = params;
    const { data } = await customFetch.get(`/products/${id}`);
    const product = data.data;
    return { product };
};

const SingleProduct = () => {
    const { product } = useLoaderData();

    const dispatch = useDispatch();
    const { image, title, price, description, colors, company, shipping } =
        product.attributes;

    const rupeeAmount = formatPrice(price);
    const [amount, setAmount] = useState(1);
    const [productColor, setColor] = useState(colors[0]);

    const handleAmount = (e) => {
        setAmount(Number(e.target.value));
    };
    // creating value for the cart item
    const cartProduct = {
        cartID: product.id + productColor,
        productId: product.id,
        image,
        title,
        price,
        company,
        productColor,
        amount,
        shipping,
    };
    //adding item to cart
    const addToCart = () => {
        dispatch(addItem({ product: cartProduct }));
    };

    return (
        <section>
            <div className="text-sm breadcrumbs capitalize">
                {/* BREADCRUMBS FOR HOME AND PRODUCTS */}
                <ul>
                    <li to={"/"}>
                        <Link to={"/"}>home</Link>
                    </li>
                    <li>
                        <Link to={"/products"}>products</Link>
                    </li>
                </ul>
            </div>
            <div className="grid gap-y-8 lg:grid-cols-2  lg:gap-x-16 mt-6">
                {/* PRODUCT IMG */}
                <img
                    className="h-96 w-96 lg:w-full rounded-xl object-cover "
                    src={image}
                    alt={title}
                />
                {/* PRODUCT DETAILS */}
                <div>
                    <h1 className="text-4xl font-bold tracking-wide capitalize">
                        {title}
                    </h1>
                    <h4 className="text-xl text-neutral-content  mt-2 font-bold tracking-wide">
                        {company}
                    </h4>
                    <p className="text-xl mt-3">{rupeeAmount}</p>
                    <p className="leading-8 py-8">{description}</p>
                    {/* COLORS SECTION */}
                    <div className="mt-6">
                        <h4 className="text-lg capitalize">available colors</h4>
                        <div className="mt-2">
                            {colors.map((eachColor) => {
                                return (
                                    <button
                                        key={eachColor}
                                        type="button"
                                        className={`rounded-full w-6 h-6 mr-2 ${
                                            eachColor === productColor &&
                                            "border-2 border-secondary"
                                        }`}
                                        style={{
                                            backgroundColor: `${eachColor}`,
                                        }}
                                        onClick={() => setColor(eachColor)}
                                    ></button>
                                );
                            })}
                        </div>
                    </div>
                    {/* AMOUNT */}
                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="amount">
                            <h4 className="mt-4">Amount</h4>
                        </label>
                        <select
                            className="select select-secondary select-bordered w-full max-w-xs mt-2"
                            onChange={handleAmount}
                            value={Number(amount)}
                            id="amount"
                        >
                            {/* DYNAMIC CART ITEMS */}
                            <GenerateAmountOptions number={20} />
                        </select>
                    </div>
                    {/* CART */}
                    <div className="mt-10">
                        <button
                            className="btn btn-secondary btn-md"
                            onClick={addToCart}
                        >
                            Add to bag
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SingleProduct;
