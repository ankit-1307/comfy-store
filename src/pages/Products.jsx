import { useLoaderData } from "react-router-dom";
import { Filters, ProductsContainer, PaginationContainer } from "../components";
import customFetch from "../utils/customFetch";

const url = "/products";

export const loader = async ({request}) => {
    
    const searchUrl = new URL(request.url)
   const params = (Object.fromEntries([...searchUrl.searchParams.entries()]))
   console.log(params)
    const { data } = await customFetch.get(url,{params});
    return { products: data.data, meta: data.meta ,params};
};

const Products = () => {
    // const { products, meta } = useLoaderData();
    return (
        <>
            <Filters />
            <ProductsContainer />
            <PaginationContainer />
        </>
    );
};

export default Products;
