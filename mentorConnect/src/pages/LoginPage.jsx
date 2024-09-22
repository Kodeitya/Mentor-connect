import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loggedInContext } from "../context/context";

const LoginPage = () => {
  const navigate = useNavigate();
  const loggedIn = useContext(loggedInContext);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("token aaja");

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      const result = await response.json();
      console.log("Login successful:", result);

      if( result.status != "ok" ) {
        setErrorMessage("*Invalid credentials");
        setLoginDetails({ email: "", password: "" });
        return;
      }

      if (result.status === 'ok' && loginDetails.role === "mentee") {
        loggedIn.setloggedIn(true);
        console.log(loggedIn);
        navigate("/dashboard");
      }
      // Reset the form
      setLoginDetails({ email: "", password: "" });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("*Invalid credentials");
      // Reset the form
      setLoginDetails({ email: "", password: "" });
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginDetails((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setErrorMessage("");
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-r from-blue-500 to-teal-400 text-white flex flex-col justify-center items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/MENTOR_Logo.jpg"
          alt="Logo"
          className="w-20 h-20 mb-8"
        />
        <h1 className="text-4xl font-bold">WELCOME TO MENTOR CONNECT, PLEASE LOGIN TO USE ALL FEATURES</h1>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">Welcome to the login page</h2>
        <form className="w-3/4 max-w-md" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-xl text-center">{errorMessage}</div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={loginDetails.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={loginDetails.password}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              value={loginDetails.role}
              onChange={(e) => handleChange(e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select role</option>
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
            <NavLink
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/forget"
            >
              Forgot Password?
            </NavLink>
          </div>
          <div className="mt-6">
            <button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
              type=""
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              CONTINUE WITH EMAIL
            </button>
          </div>
        </form>

        <div className="mt-4 flex w-full justify-center">
          <button
            className="w-[58%] bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate("/signup")} // Redirect to Signup page
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
