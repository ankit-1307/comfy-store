import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero";
import customFetch from "../utils/customFetch";
import FeaturedProducts from "../components/FeaturedProducts";

const url = "/products?featured=true";

export const loader = async () => {
    const { data } = await customFetch.get(url);
    const products = data.data;
    return { products };
};

const Landing = () => {
   
    return (
        <>
            <Hero />
            <FeaturedProducts />
        </>
    );
};

export default Landing;
