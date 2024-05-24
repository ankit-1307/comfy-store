import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { SubmitBtn, FormInput } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
    (store) =>
    async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        try {
            const response = await customFetch.post("/auth/local", data);
            toast.success("logged in successfully!");
            store.dispatch(loginUser(response.data));
            return redirect("/");
        } catch (error) {
            toast.error(
                error?.response?.data?.error?.message ||
                    "please, check your credentials"
            );
            return null;
        }
    };

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = { identifier: "test@test.com", password: "secret" };
    const loginAsGuestUser = async () => {
        try {
            const response = await customFetch.post("/auth/local", data);
            toast.success("logged in as guest successfully!");
            dispatch(loginUser(response.data));
            navigate("/");
        } catch (error) {
            toast.error("guest user login error.please try later.");
            return null;
        }
    };
    return (
        <section className="h-screen grid place-items-center">
            <Form
                method="POST"
                className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
            >
                <h4 className="text-center text-3xl font-bold">Login</h4>
                <FormInput type={"email"} label={"email"} name={"identifier"} />
                <FormInput
                    type={"password"}
                    label={"password"}
                    name={"password"}
                />
                <div className="mt-4">
                    <SubmitBtn type="submit" text={"login"} />
                </div>
                <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={loginAsGuestUser}
                >
                    Guest User
                </button>
                <p className="text-center capitalize">
                    not a member yet?{" "}
                    <Link
                        to={"/register"}
                        className="ml-2 link link-hover link-primary"
                    >
                        register
                    </Link>
                </p>
            </Form>
        </section>
    );
};

export default Login;
