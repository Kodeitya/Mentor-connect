import React from 'react';

const Card = ({ image, name, role,technology }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Mentor Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-32 object-cover"
      />
      
      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-700">{role}</p>
        <p className="text-gray-700">{technology}</p>
        
      </div>
    </div>
  );
};

export default Card;
