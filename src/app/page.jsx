"use client";

import Image from "next/image";
import RegistrationForm from "../components/RegistrationForm";
export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
      {/* Left Side: Logo */}
      <div className="flex justify-center items-center bg-white w-full md:w-1/2 p-8">
        <div className="relative w-[350px] md:w-[450px] h-[200px] md:h-[260px] rounded-3xl flex items-center justify-center shadow-lg border border-gray-300">
          <Image src="/backdrop.png" width="400" height="400" alt="logo" />
        </div>
      </div>

      {/* Right Side: Quiz Info & Registration */}
      <div className="flex flex-col items-center justify-center text-center bg-yellow-300 w-full md:w-1/2 p-8">
        <h1 className="text-[#2A6BB5] italic font-extrabold text-4xl md:text-5xl">
          SUVIDYA&apos;S
        </h1>
        <h1 className="text-[#2E3093] italic font-extrabold text-4xl md:text-5xl">
          CHEMTECH QUIZ
        </h1>
        <h3 className="text-[#2A6BB5] font-medium text-lg md:text-xl mt-2">
          Only for Students and Fresh Graduates.
        </h3>

        {/* Registration Form */}
        <div className="mt-6 w-full max-w-md">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}