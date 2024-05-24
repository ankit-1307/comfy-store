export const formatPrice = (price) => {
    const indianPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    });

    return indianPrice.format(((price / 100) * (83.3)-.18).toFixed(2));
};

export const GenerateAmountOptions = ({ number }) => {
    const option = Array.from({ length: number }, (_, index) => {
        const amount = index + 1;
        return (
            <option value={amount} key={amount}>
                {amount}
            </option>
        );
    });
    return option;
};
