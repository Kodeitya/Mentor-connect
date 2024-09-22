import { div } from "framer-motion/client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MentorInfo() {
    const [show, setShow] = useState(false);
    const [mentor, setMentor] = useState({});

    const { email } = useParams();

    function handleClick() {
        setShow(!show);
    }

    useEffect(() => {
        if (show) {
            const script = document.createElement("script");
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [show]);

    useEffect(() => {
        const func = async () => {
            console.log(email);
            const result = await fetch(`http://localhost:3000/api/mentorByMail/${email}`);
            const eml = await result.json();
            console.log(eml);
            setMentor(eml[0]);
        };
        func();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen "> {/* Full screen flex container */}
            <div className="flex flex-col md:flex-row justify-center items-center border p-6 shadow-2xl rounded-xl">
                <div className="md:w-1/3 w-full mb-6 md:mb-0 ">
                    <img src={mentor.imageUrl} alt="" className="w-full h-auto object-cover rounded-xl" />
                </div>
                <div className="md:w-2/3 w-full text-center md:text-left text-2xl p-6">
                    <h1>My Name is: {mentor.name}</h1>
                    <h1>I'm at position: {mentor.role}</h1>
                    <h3>I am good at: {mentor.technologies && mentor.technologies.map((skill, index) => (
                        <span key={index}>{skill}, </span>
                    ))}</h3>
                    <h3>You can connect with me in my schedule timing..</h3>
                    <div className="flex justify-center md:justify-start items-center p-4">
                        <button
                            className="w-40 text-sm bg-[#118577] rounded-lg text-white p-2 h-11"
                            onClick={handleClick}
                        >
                            Scheduler
                        </button>
                    </div>

                    {/* {show && (
                        <div className="calendly-inline-widget" data-url="https://calendly.com/progamer6512/meeting"></div>
                    )} */}

                    {show && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                    onClick={handleClick}
                                >
                                    X
                                </button>
                                <div
                                    className="calendly-inline-widget"
                                    data-url="https://calendly.com/progamer6512/meeting"
                                    style={{ minWidth: '320px', height: '700px' }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
