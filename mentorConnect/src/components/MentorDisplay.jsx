import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MentorDisplay = () => {
  const [currentMentors, setCurrentMentors] = useState([]);

  const navigate = useNavigate();
  function handleClick(email) {
    navigate(`mentorById/${email}`);
  }
  
  useEffect(() => {
    fetch("http://localhost:3000/api/mentors")
      .then((response) => response.json())
      .then((jsonData) => {
        // console.log(jsonData);
        setCurrentMentors(jsonData);
      })
      .catch((error) => console.error("error fetching data: ", error));
  }, []);
  return (
    <div className="flex gap-3 flex-wrap mx-4 my-14">
      {currentMentors.map((mentor, index) => (
        <div key={index} className="mx-3 rounded-xl w-1/6 h-1/4" onClick={
          () => {handleClick(mentor.email)}}>
      <div className="">
        <img className="w-[100%] h-[20rem] object-cover rounded-lg" src={mentor.imageUrl} alt={mentor.name} />
      </div>
      <div className="flex flex-col flex-wrap text-center">
        <h2>{mentor.name}</h2>
        <p>{mentor.role}</p>
        <p>{mentor.technologies.join(", ")}</p>
      </div>
    </div>
  ))
}
    </div >
  );
};

export default MentorDisplay;
