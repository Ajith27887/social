import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, error, setError, setSuccess, success } =
    useAuth();
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Account doesn't exist");
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/");
      console.log(currentUser, "crr");
    }
  }, [currentUser, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Log In</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              ref={emailRef}
              required
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 relative">
            <input
              ref={passwordRef}
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/Signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
