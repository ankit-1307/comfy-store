import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

const PaginationContainer = () => {
    const { meta } = useLoaderData();
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const { pageCount, page } = meta.pagination;

    const pages = Array.from({ length: pageCount }, (_, index) => {
        return index + 1;
    });

    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        searchParams.set("page", pageNumber);
        navigate(`${pathname}?${searchParams.toString()}`);
    };
    if (pageCount < 2) return null;
    return (
        <div className="mt-16">
            <div className="join flex justify-end">
                <button
                    className="join-item btn btn-sm md:btn-md"
                    onClick={() => {
                        let prevPage = page - 1;
                        if (prevPage < 1) prevPage = pageCount;
                        handlePageChange(prevPage);
                    }}
                >
                    PREV
                </button>
                {pages.map((pageNumber) => {
                    return (
                        <button
                            onClick={() => {
                                handlePageChange(pageNumber);
                            }}
                            key={pageNumber}
                            className={`join-item btn btn-sm md:btn-md border-none ${
                                pageNumber === page
                                    ? "bg-base-300 border-base-300"
                                    : ""
                            } `}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button
                    className="join-item btn btn-sm md:btn-md "
                    onClick={() => {
                        let nextPage = page + 1;
                        if (nextPage > pageCount) nextPage = 1;
                        handlePageChange(nextPage);
                    }}
                >
                    NEXT
                </button>
            </div>
        </div>
    );
};

export default PaginationContainer;
