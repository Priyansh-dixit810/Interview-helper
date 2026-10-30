import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
function LoginPage() {
  const {loading, handleLogin} = useAuth();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(userDetails)
    navigate("/")
  };
  if(loading){
    <main>
      <p>Loading.....</p>
    </main>
  }
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
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
              placeholder="Enter your password"
              className="rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 cursor-pointer transition-all hover:scale-101 "
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          New user?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
