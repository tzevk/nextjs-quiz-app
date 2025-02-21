import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Hourglass } from "react-loader-spinner";
import { useEffect, useState } from "react";

const Timer = ({ timeRemaining }) => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 10) {
      const interval = setInterval(() => {
        setFlash((prev) => !prev);
      }, 500); // Flash every 0.5s
      return () => clearInterval(interval);
    } else {
      setFlash(false);
    }
  }, [timeRemaining]);

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
  };

  return (
    <div
      className={`w-65 h-20 flex items-center justify-center gap-3 px-4 rounded-xl shadow-lg border border-gray-300
        ${
          flash
            ? "bg-red-600 text-white animate-pulse" // Flash red in last 10 sec
            : "bg-white/80 backdrop-blur-md text-black"
        }`}
    >
      <Hourglass
        visible={true}
        height="28"
        width="28"
        ariaLabel="hourglass-loading"
        colors={["#000", "#000"]}
      />
      <p className="text-xl font-bold">{convertTime(timeRemaining)}</p>
    </div>
  );
};

export default Timer;