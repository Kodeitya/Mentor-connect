import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ChatBot from "../components/chatBot";
import MentorDisplay from "../components/MentorDisplay";


const Dashboard = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    fetch("http://localhost:3000/api/mentors")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setMentors(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  return (
    <>
      <div className="h-screen w-full flex flex-col focus:shadow-outline">
        <div className="">
          <Navbar />
          <div className="h-screen flex">
            <Hero />
          </div>
        </div>
      </div>
      <div className="mb-4 bg-[#172e59] py-12 shadow-2xl">
        <div className="mx-auto space-y-4 md:max-w-val lg:max-w-2xl mb-28">
          <h2 className="text-3xl lg:text-center mx-auto text-white font-bold">
            Not sure if mentorship is right for you? Give it a try with a
            one-off session.
          </h2>
          <p className="text-lg lg:text-center mx-auto text-white">
            A quick, easy call with an expert is just one click away with our
            attractive one-off sessions. Picking a brain, talking through an
            issue or getting to know an industry expert has never been easier.
          </p>
        </div>

        <ul className="relative spcae-y-8 sm:grid sm:grid-cols-1 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gp-8 overflow-hidden px-8">
          <img
            className="hidden lg:block absolute -left-20 -top-20"
            src="https://cdn.mentorcruise.com/img/home/shapes/bg-dots.svg"
            alt="Dots"
          ></img>
          <img
            className="hidden lg:block absolute -right-20 -bottom-20"
            src="https://cdn.mentorcruise.com/img/home/shapes/bg-dots.svg"
            alt="Dots"
          ></img>
          <li className="bg-white rounded-lg p-6 text-center shadow-md">
            <h3 className="text-2xl font-bold mb-4">Explore Mentorship</h3>
            <p className="text-gray-700 mb-4">
              if you're looking for a mentor, and you're just not sure about how
              this all works – this should be for you. In a casual, informal
              introductory call, a mentor will introduce themselves ...
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center mx-auto">
              Explore <span className="ml-2">&rarr;</span>
            </button>
          </li>

          <li className="bg-white rounded-lg p-6 text-center shadow-md">
            <h3 className="text-2xl font-bold mb-4">Study plan</h3>
            <p className="text-gray-700 mb-4">
              Looking to learn a new skill? The vast amount of resources on any
              topic on the internet can feel overwhelming at times. A mentor can
              give you an overview of worthwhile
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center mx-auto">
              Explore <span className="ml-2">&rarr;</span>
            </button>
          </li>

          <li className="bg-white rounded-lg p-6 text-center shadow-md">
            <h3 className="text-2xl font-bold mb-4">Meet Experts</h3>
            <p className="text-gray-700 mb-4">
              Some big interviews coming up? In this 1-hour session, a mentor
              with hiring experience will act as a technical interviewer and ask
              you some standard hiring questions ..
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center justify-center mx-auto">
              Explore <span className="ml-2">&rarr;</span>
            </button>
          </li>
        </ul>
      </div>

      <MentorDisplay/>
      <ChatBot/>
      <Footer />
    </>
  );
};

export default Dashboard;
