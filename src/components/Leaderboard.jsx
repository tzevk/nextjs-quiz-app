import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardResponse = await axios.post(
          `/api/leaderboard?date=${new Date().getTime()}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
        setLeaderboard(leaderboardResponse.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (leaderboard.length === 0) return <Loading />;

  return (
    <div className="w-full flex flex-col items-center justify-center bg-[#FCE86C] p-10 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center max-w-4xl w-full">
      <div className="flex flex-row items-center justify-center w-full bg-white shadow-lg rounded-xl p-6 max-w-4xl">
  <img src="/backdrop.png" alt="SIT Logo" className="h-29 md:h-24 lg:h-36 object-contain" /> 
  <div className="ml-4 md:ml-6 lg:ml-8"> 
    <h1 className="text-[#2A6BB5] italic font-extrabold text-4xl md:text-5xl">
      SUVIDYA&apos;S
    </h1>
    <h1 className="text-[#2E3093] italic font-extrabold text-4xl md:text-5xl">
      CHEMTECH QUIZ
    </h1>
  </div>
</div>

        {/* Score & Win Banner */}
        <p className="mt-4 text-lg md:text-2xl lg:text-3xl font-semibold text-white bg-[#2A6BB5] px-6 py-3 rounded-lg shadow-md w-full text-center">
          🎉 SCORE AND WIN EXCITING PRIZES! 🏆
        </p>

        {/* Leaderboard Title */}
        <h2 className="text-[#2A6BB5] text-2xl md:text-2xl lg:text-4xl font-bold mt-4 text-center">
          LEADERBOARD
        </h2>

        {/* Leaderboard Table */}
        <div className="w-full mt-6 overflow-hidden">
          <Table className="bg-white shadow-xl rounded-xl overflow-hidden w-full border border-gray-300">
            <TableHeader>
              <TableRow className="bg-[#2A6BB5] text-white">
                <TableHead className="text-center font-extrabold text-lg py-3">🏆 Rank</TableHead>
                <TableHead className="text-center font-extrabold text-lg py-3">👤 Name</TableHead>
                <TableHead className="text-center font-extrabold text-lg py-3">📊 Score</TableHead>
                <TableHead className="text-center font-extrabold text-lg py-3">⏳ Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard?.map((user, index) => (
                <TableRow
                  key={user._id}
                  className={`text-lg font-medium ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } focus:outline-none`}
                >
                  <TableCell className="text-center p-4 font-bold text-gray-900">{index + 1}</TableCell>
                  <TableCell className="text-center p-4 text-gray-900 font-bold">{user.name || "N/A"}</TableCell>
                  <TableCell className="text-center p-4 text-green-600 font-bold">{user.score || 0}</TableCell>
                  <TableCell className="text-center p-4 text-gray-700">
                    {convertTime(user.submitTime) || "0:00"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
