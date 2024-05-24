import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        const res = await customFetch.post("/auth/local/register", data);
        toast.success("account created successfully!");
        return redirect("/login");
    } catch (error) {
        toast.error(
            error?.response?.data?.error?.message ||
                "please, check your credentials"
        );
        return null;
    }
};

const Register = () => {
    return (
        <section className="h-screen grid place-items-center">
            <Form
                method="POST"
                className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
            >
                <h4 className="text-center text-3xl font-bold">Register</h4>
                <FormInput
                    type={"username"}
                    label={"username"}
                    name={"username"}
                />
                <FormInput type={"email"} label={"email"} name={"email"} />
                <FormInput
                    type={"password"}
                    label={"password"}
                    name={"password"}
                />
                <div className="mt-4 ">
                    <SubmitBtn type="submit" text={"REGISTER"} />
                </div>
                <p className="text-center capitalize">
                    already a member?{" "}
                    <Link
                        to={"/login"}
                        className="ml-2 link link-hover link-primary"
                    >
                        login
                    </Link>
                </p>
            </Form>
        </section>
    );
};

export default Register;
