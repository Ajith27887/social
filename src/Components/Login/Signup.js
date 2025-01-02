import React, { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const nameRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    passwordConfirmRef = useRef(),
    navigate = useNavigate(),
    { signUp } = useAuth(),
    [error, setError] = useState(""),
    handleSubmit = async (e) => {
      e.preventDefault();

      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match");
      }

      try {
        setError("");
        await signUp(
          emailRef.current.value,
          passwordRef.current.value,
          nameRef.current.value
        );
        console.log("Profile updated");

        navigate("/Login");
      } catch (error) {
        console.error("Error during signup:", error);
        setError("Something went wrong");
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              ref={nameRef}
              required
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              ref={emailRef}
              required
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              ref={passwordRef}
              required
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              ref={passwordConfirmRef}
              required
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          Have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/Login">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
