"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Instructions = () => {
  const router = useRouter();
  const [started, setStarted] = useState(false);

  // Ensure user is registered before accessing this page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        router.push("/"); // Redirect to registration if no user is found
      }
    }
  }, [router]);

  const handleStartQuiz = () => {
    setStarted(true);
    setTimeout(() => {
      router.push("/quiz"); // Redirect to Quiz Page
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-300 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-[550px] text-center border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 italic">INSTRUCTIONS</h1>
        <ul className="text-lg text-gray-800 space-y-3 text-left font-medium">
          <li><strong>1.</strong> You have <strong>10 questions</strong>, <u>1 mark each</u>.</li>
          <li><strong>2.</strong> The questions are <strong>MCQs</strong>.</li>
          <li><strong>3.</strong> <span className="text-red-500 font-bold">No negative marking</span>.</li>
          <li><strong>4.</strong> You have <strong>2 minutes</strong> to complete the quiz.</li>
          <li><strong>5.</strong> The quiz will be <strong>auto-submitted</strong> when time runs out.</li>
        </ul>

        {/* Start Quiz Button */}
        {!started ? (
          <button
            onClick={handleStartQuiz}
            className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
          >
            Start Quiz →
          </button>
        ) : (
          <p className="mt-6 text-blue-700 font-semibold text-lg">Loading quiz...</p>
        )}
      </div>
    </div>
  );
};

export default Instructions;