import day from "dayjs";
import { useLoaderData } from "react-router-dom";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrdersList = () => {
    const { orders, meta } = useLoaderData();
    console.log(orders);
    return (
        <div className="mt-8">
            <h4 className="capitalize mb-4">
                total Orders: {meta.pagination.total}
            </h4>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Products</th>
                            <th>Cost</th>
                            <th className="hidden sm:block">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const id = order.id;
                            const {
                                address,
                                name,
                                numItemsInCart,
                                orderTotal,
                                createdAt,
                            } = order.attributes;
                            const date = day(createdAt).format(
                                "hh:mm a - MMM Do, YYYY "
                            );
                            return (
                                <tr key={id}>
                                    <td>{name}</td>
                                    <td>{address}</td>
                                    <td>{numItemsInCart}</td>
                                    <td>{orderTotal}</td>
                                    <td className="hidden sm:block">{date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersList;
