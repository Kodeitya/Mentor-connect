import React from "react";

const Footer = () => {
  return (
    <>
      <div className="mt-5 flex justify-center items-center flex-col gap-2 bg-gray-50 py-4">
        <div className="flex justify-center items-center gap-2">
          <div>
            <img src="MENTOR_Logo.jpg" alt="" className="size-16" />
          </div>
          <div>
            <h2 className="text-4xl font-bold">
              Mentor<span className="text-2xl font-medium"> Connect</span>{" "}
            </h2>
          </div>
        </div>
        <div>
          <p className="text-2xl">
            Your trusted source to find highly-vetted mentors & industry
            professionals to move your career ahead.
          </p>
        </div>
        <div className="flex gap-3">
          <a href="instgram.com">
            {" "}
            <lord-icon
              src="https://cdn.lordicon.com/ewswvzmw.json"
              trigger="hover"
            ></lord-icon>
          </a>

          <a href="facebook.com">
            <lord-icon
              src="https://cdn.lordicon.com/shlffxcb.json"
              trigger="hover"
            ></lord-icon>
          </a>

          <a href="linkedin.com">
            <lord-icon
              src="https://cdn.lordicon.com/mdyiqybm.json"
              trigger="hover"
            ></lord-icon>
          </a>

          <a href="twitter.com">
            <lord-icon
              src="https://cdn.lordicon.com/lhscugaw.json"
              trigger="hover"
            ></lord-icon>
          </a>
        </div>
        © 2024 MentorConnect. All Rights Reserved.
      </div>
    </>
  );
};

export default Footer;
