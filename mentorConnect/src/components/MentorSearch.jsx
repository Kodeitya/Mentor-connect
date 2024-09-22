// MentorSearch.jsx
import React, { useState } from "react";

const MentorSearch = ({ className, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearch = () => {
    // Assuming searchQuery is the mentor's name and filter is the skill
    onSearch(searchQuery, filter);
  };

  return (
    <div className={`bg-white text-black p-8 rounded-lg shadow-lg ${className} flex flex-col items-center`}>
      <h2 className="text-3xl font-semibold mb-4">Search Mentors</h2>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        />
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        >
          <option value="">Filter by skills</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="AI">AI</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-orange-500 transition duration-300"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default MentorSearch;
