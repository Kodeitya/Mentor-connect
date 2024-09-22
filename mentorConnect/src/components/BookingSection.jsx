// BookingSection.jsx
import React from "react";
import { motion } from "framer-motion";
const BookingSection = ({ className, mentor }) => {
  return (
    <motion.div
    className={`bg-white text-black p-8 rounded-lg shadow-lg ${className} flex flex-col items-center`}
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
  >
    
      <h2 className="text-3xl font-semibold mb-4">Book a Mentor</h2>
      <p className="text-lg mb-4">Select a mentor to book a session with:</p>
      {mentor.name ? (
        <div className="mentor-card bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md text-center">
          <p className="text-lg mb-2"><strong>Mentor:</strong> {mentor.name}</p>
          <p className="text-lg mb-4"><strong>Skills:</strong> {mentor.skills}</p>
          <button
            type="button"
            className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-orange-500 transition duration-300"
          >
            Book Session
          </button>
        </div>
      ) : (
        <p className="text-lg text-gray-600">No mentor selected. Search for a mentor to book a session.</p>
      )}
       </motion.div>
  );
};

export default BookingSection;
