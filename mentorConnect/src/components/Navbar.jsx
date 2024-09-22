import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { loggedInContext } from "../context/context";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const loggedIn = useContext(loggedInContext);
  const navigate = useNavigate();

  const loginLogout = () =>{
    if(loggedIn.loggedIn){
      loggedIn.setloggedIn(false);
      navigate("/");
    }else{
      navigate("/login");
    }
  }

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-2 shadow-md w-full fixed top-0 z-30">
      <div className="w-full flex justify-between items-center">
        {/* Left: Logo/Heading */}
        <div className="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/MENTOR_Logo.jpg"alt="Mentor Connect Logo" className="w-8 h-8 mr-2" />
          <div className="text-2xl font-bold">
            <Link to="/">MENTOR Connect</Link>
          </div>
        </div>

        {/* Right: Log In and Sign Up Buttons */}
        <div>
            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded mr-2 hover:bg-gray-200" onClick={loginLogout}>
              {loggedIn.loggedIn ? "Log out" : "Log In"}
            </button>

          {
            !loggedIn.loggedIn &&
            <Link to="/signup">
            <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded hover:bg-gray-200">
              Sign Up
            </button>
          </Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
