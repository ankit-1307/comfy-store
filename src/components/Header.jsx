import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";

const Header = () => {
    const { user } = useSelector((store) => {
        return store.user;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
        dispatch(clearCart());
        dispatch(logoutUser());
    };

    return (
        <header className="bg-neutral text-neutral-content py-2 ">
            <div className="align-components flex justify-center sm:justify-end ">
                {user ? (
                    <div className="flex gap-x-2 sm:gap-x-8 justify-center items-center">
                        <p className="text-xs sm:text-sm capitalize">
                            Hello, {user.username}
                        </p>
                        <button
                            onClick={handleLogout}
                            className="btn btn-outline btn-error btn-xs"
                        >
                            LOGOUT
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-x-4 justify-center items-center">
                        <Link
                            to={"/login"}
                            className="link link-hover hover:link-info text-xs sm:text-sm"
                        >
                            Sign in/Guest
                        </Link>
                        <Link
                            to={"/register"}
                            className="link link-hover text-xs hover:link-secondary sm:text-sm"
                        >
                            Create Account
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
