import TypingEffect from "./Blinking";
import UpwardTransition from "./Scrolling";

export default function Hero() {
  return (
    <div className="flex w-[90%] h-screen mx-auto"> {/* Full height of the screen and flex for side-by-side layout */}
      {/* Left side: Hero section */}
      <div className="w-1/2 flex flex-col items-start p-2 space-y-8 py-24">
        <div className="text-2xl">
          <h2>Learn a new skill, launch a project, land your dream career.</h2>
        </div>
        <div className="text-6xl font-medium font-sans justify-start">
          <h1>1-On-1 <TypingEffect /></h1>
          <h1>Mentorship</h1>

          <div className="max-w-fit text-xl flex justify-start items-center gap-x-4 mt-5">
            <div className="border border-gray-500 rounded-lg p-2">
              <input
                className="w-80 px-2 outline-none"
                type="text"
                placeholder="Search by company, skills or role"
              />
            </div>
            <div>
              <button className="w-40 text-sm bg-[#118577] rounded-lg text-white p-2 h-11">
                Find mentors
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Scrolling mentors */}
      <div className="w-2/5 flex items-center justify-center">
        <UpwardTransition />
      </div>
    </div>
  );
}
