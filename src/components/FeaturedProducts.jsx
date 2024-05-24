import { ProductsGrid, SectionTitle } from "./index";

const FeaturedProducts = () => {
    return (
        <div className="pt-24">
            <SectionTitle text="Featured Products" />
            <ProductsGrid />
        </div>
    );
};

export default FeaturedProducts;
