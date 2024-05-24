import { useLoaderData, Link } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import { formatPrice } from "../utils";

const ProductsList = () => {
    const { products } = useLoaderData();
    //console.log(products);
    return (
        <div className=" grid mt-12 gap-y-8">
            {products.map((eachProducts) => {
                const { title, price, image, company } =
                    eachProducts.attributes;
                const indianRupees = formatPrice(price);
                return (
                    <Link
                        key={eachProducts.id}
                        to={`/products/${eachProducts.id}`}
                        className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
                    >
                        <img
                            src={image}
                            alt={title}
                            className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="ml-0 sm:ml-16">
                            <h3 className="card-title capitalize tracking-wider">
                                {title}
                            </h3>
                            <h4 className="capitalize text-md text-neutral-content">
                                {company}
                            </h4>
                        </div>
                        <p className="font-medium ml-0 sm:ml-auto text-lg">
                            {indianRupees}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

export default ProductsList;
