import { span } from 'framer-motion/client';
import React, { useState, useEffect } from 'react';

const UpwardTransition = () => {
  const [currentMentors, setCurrentMentors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/mentors')
    .then(response=>response.json())
    .then(jsonData=>{
        // console.log(jsonData);
        setCurrentMentors(jsonData)
    })
    .catch(error=>console.error('error fetching data: ',error));
    
  }, []);

  return (
    <div className="h-[80vh] w-full overflow-hidden relative">
      <ul className="absolute top-0 animate-scroll w-full space-y-4">
        {currentMentors.map((mentor, index) => (
          <li key={index} className="w-full bg-white shadow-md p-4 rounded-lg flex items-center space-x-4">
            <img
              src={mentor.imageUrl} // Image from public folder
              alt={mentor.name}
              className="w-36 h-36 rounded-3xl object-cover"
            />
            <div className='space-y-2 px-4'>
              <h3 className="text-xl text-black font-semibold">{mentor.name}</h3> {/* Displaying mentor name */}
              <p className="text-gray-500">{mentor.role}</p> {/* Displaying mentor expertise */}
              <p className="text-gray-500 space-x-2">{mentor.technologies.map((skill, index)=>{
                return <span key={index}>{skill},</span>;
              })}</p>
              <p className="text-gray-500">{mentor.email}</p> {/* Displaying mentor expertise */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpwardTransition;
