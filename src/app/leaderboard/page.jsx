"use client";

import Image from "next/image";
import Link from "next/link";
import Leaderboard from "../../components/Leaderboard";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FCE76C]">
      {/* Leaderboard Section */}
      <div className="mt-6 w-full flex justify-center">
        <Leaderboard />
      </div>
    </div>
  );
}