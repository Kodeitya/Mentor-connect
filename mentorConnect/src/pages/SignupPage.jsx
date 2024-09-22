import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { loggedInContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [role, setRole] = useState(""); // To track whether the user selects mentee or mentor
  const loggedIn = useContext(loggedInContext);
  const navigate = useNavigate();

  const [mentorDetails, setMentorDetails] = useState({
    name: "",
    email: "",
    role: "",
    technologies: [],
    imageUrl: "", // For mentor's uploaded image
    password: ""
  });
  const [menteeDetails, setMenteeDetails] = useState({
    name: "",
    email: "",
    imageUrl: "", // For mentee's uploaded image
    password: ""
  });
  
  const [newTechnology, setNewTechnology] = useState("");

  // Handle role change (mentor/mentee)
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Handle input changes based on role (either mentor or mentee)
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (role === "mentor") {
      // Update mentor details
      setMentorDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (role === "mentee") {
      // Update mentee details
      setMenteeDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Add technologies for mentor
  const handleTechnologyAdd = (e) => {
    e.preventDefault();
    if (newTechnology.trim() !== "") {
      setMentorDetails((prevState) => ({
        ...prevState,
        technologies: [...prevState.technologies, newTechnology.trim()],
      }));
      setNewTechnology(""); // Clear input
    }
  };

  // Remove technology from mentor's list
  const handleTechnologyRemove = (techToRemove) => {
    setMentorDetails((prevState) => ({
      ...prevState,
      technologies: prevState.technologies.filter((tech) => tech !== techToRemove),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "mentor") {
      const response = await fetch('http://localhost:3000/api/mentors', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(mentorDetails),
      });

      const result = await response.json();
      console.log('Mentor Details:', result);
      
      // You can send `mentorDetails` to the backend for saving
    } else if (role === "mentee") {
      const response = await fetch('http://localhost:3000/api/mentees', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(menteeDetails),
      });

      const result = await response.json();
      console.log('Mentee Details:', result);

      loggedIn.setloggedIn(true);

      navigate('/dashboard');

    } else {
      console.error("Please select a role before submitting the form.");
    }
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
        <h1 className="text-4xl font-bold">WELCOME TO MENTOR CONNECT</h1>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">Create a new account</h2>
        <form className="w-3/4 max-w-md" onSubmit={handleSubmit}>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
              Sign up as:
            </label>
            <select
              id="role"
              value={role}
              onChange={handleRoleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select role</option>
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>

          {/* Full Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your full name"
              name="name"
              onChange={handleInputChange}
              value={role === "mentor" ? mentorDetails.name : menteeDetails.name}
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={role === "mentor" ? mentorDetails.email : menteeDetails.email}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Enter a strong password"
              onChange={handleInputChange}
              value={role === "mentor" ? mentorDetails.password : menteeDetails.password}
            />
          </div>

          {/* Role Selection */}
      
          {/* Mentor-Specific Fields */}
          {role === "mentor" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mentorRole">
                  Role
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="mentorRole"
                  name="role"
                  type="text"
                  value={mentorDetails.role}
                  onChange={handleInputChange}
                  placeholder="Enter your role as mentor"
                />
              </div>

             

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mentorTechnologies">
                  Technologies
                </label>
                <div className="flex flex-wrap items-center border py-2 px-3 rounded shadow">
                  {mentorDetails.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
                    >
                      {tech}
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="ml-2 cursor-pointer"
                        onClick={() => handleTechnologyRemove(tech)}
                      />
                    </div>
                  ))}
                  <input
                    className="outline-none flex-grow"
                    id="mentorTechnologies"
                    type="text"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Enter a technology"
                  />
                  <button
                    className="text-blue-500 focus:outline-none focus:shadow-outline"
                    onClick={handleTechnologyAdd}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Mentee-Specific Fields */}
          {role === "mentee" && (
            <>
            </>
          )}

          {/* Image Upload for Mentor or Mentee */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUpload">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="imageUrl"
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value= {role === "mentor" ? mentorDetails.imageUrl : menteeDetails.imageUrl}
              placeholder="Enter image URL"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;