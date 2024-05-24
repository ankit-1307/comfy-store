import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductsGrid = () => {
    const { products } = useLoaderData();
    return (
        <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((eachProducts) => {
                const { title, price, image } = eachProducts.attributes;
                const indianRupees = formatPrice(price);
                return (
                    <Link
                        key={eachProducts.id}
                        to={`/products/${eachProducts.id}`}
                        className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
                    >
                        <figure className="pt-4 px-4">
                            <img
                                src={image}
                                alt={title}
                                className="h-64 md:h-48 w-full object-cover rounded-xl"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title capitalize tracking-wider">
                                {title}
                            </h2>
                            <span className="text-secondary">
                                {indianRupees}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default ProductsGrid;
