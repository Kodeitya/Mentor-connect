import React, { useState } from "react";
import { motion } from "framer-motion";
const ProfileSection = ({ className }) => {
  // Sample list of mentors
  const mentors = [
    { name: "John Doe", email: "john@example.com", skills: ["React", "Node.js"], interests: ["Web Development", "AI"] },
    { name: "Jane Smith", email: "jane@example.com", skills: ["JavaScript", "Angular"], interests: ["Frontend Development", "UI/UX"] },
    { name: "Alice Johnson", email: "alice@example.com", skills: ["Python", "Machine Learning"], interests: ["Data Science", "AI"] },
  ];

  // State for the current mentor index
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mentors.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mentors.length) % mentors.length);
  };

  const currentMentor = mentors[currentIndex];

  return (
    <motion.div
    className={`bg-white text-black p-8 rounded-lg shadow-lg ${className} flex flex-col items-center`}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
  >
      <h2 className="text-3xl font-semibold mb-4">Mentor Profiles</h2>
      <div className="flex items-center space-x-4">
        <span
          onClick={handlePrev}
          className="cursor-pointer text-3xl text-gray-600 hover:text-gray-800"
          title="Previous Mentor"
        >
          &larr; {/* Left arrow */}
        </span>
        <div className="flex-1 text-center">
          <p><strong>Name:</strong> {currentMentor.name}</p>
          <p><strong>Email:</strong> {currentMentor.email}</p>
          <p><strong>Skills:</strong> {currentMentor.skills.join(", ")}</p>
          <p><strong>Interests:</strong> {currentMentor.interests.join(", ")}</p>
        </div>
        <span
          onClick={handleNext}
          className="cursor-pointer text-3xl text-gray-600 hover:text-gray-800"
          title="Next Mentor"
        >
          &rarr; {/* Right arrow */}
        </span>
      </div>
      </motion.div>
  );
};

export default ProfileSection;
