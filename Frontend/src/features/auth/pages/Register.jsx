
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function RegisterPage() {

    const {loading,handleRegister} = useAuth();
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister(userDetails.username,userDetails.email,userDetails.password);
        navigate("/")
    };

    if(loading){
        <main>
            Loading....
        </main>
    }


    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-gray-100 px-4 py-8">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">
                    Create an account
                </h1>

                <p className="mb-6 text-sm text-gray-500">
                    Enter your details to get started.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userDetails.username}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                            minLength={8}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
}

export default RegisterPage;
