import assets from "../../../assets/assets";
import { useLocation } from "react-router-dom";
import TabSelector from "../../../components/TabSelector/TabSelector";
import { useState } from "react";
import MatchCompletedCard from "../../../components/MatchCompletedCard/MatchCompletedCard";

const Records = () => {
  const location = useLocation();
  const { team } = location.state || {
    name: "Unknown Team",
    icon: "", // Placeholder if no icon exists
    wins: 0,
    losses: 0,
    draws: 0,
  };

  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => {
    const tabName = tab.split(" (")[0];
    setActiveTab(tabName);
  };

  const getDisplayCounts = () => {
    switch (activeTab) {
      case "Wins":
        return [{ label: "W", count: team.wins, bg: "bg-[#35E7801A]" }];
      case "Losses":
        return [{ label: "L", count: team.losses, bg: "bg-[#FF4E4D1A]" }];
      case "Draws":
        return [{ label: "D", count: team.draws, bg: "bg-[#141F2B1A]" }];
      default:
        return [
          { label: "W", count: team.wins, bg: "bg-[#35E7801A]" },
          { label: "D", count: team.draws, bg: "bg-[#141F2B1A]" },
          { label: "L", count: team.losses, bg: "bg-[#FF4E4D1A]" },
        ];
    }
  };

  // Mock match history data
  const matchHistory = [
    {
      team1: team.name,
      team2: "Opponent A",
      team1score: 2,
      team2score: 1,
      team1icon: team.icon,
      team2icon: assets.team7,
      date: "Jan 13th", // Example date
      day: "Saturday", // Example day
    },
    {
      team1: "Opponent B",
      team2: team.name,
      team1score: 0,
      team2score: 0,
      team1icon: assets.team3,
      team2icon: team.icon,
      date: "Feb 14th",
      day: "Thursday",
    },
    {
      team1: team.name,
      team2: "Opponent C",
      team1score: 1,
      team2score: 3,
      team1icon: team.icon,
      team2icon: assets.team5,
      date: "March 10th",
      day: "Monday",
    },
  ];

  const getMatchBgColor = (teamName, team1, team2, team1score, team2score) => {
    if (team1 === teamName && team1score > team2score) return "bg-[#35E7801A]"; // Win
    if (team2 === teamName && team2score > team1score) return "bg-[#35E7801A]"; // Win
    if (team1 === teamName && team1score < team2score) return "bg-[#FF4E4D1A]"; // Loss
    if (team2 === teamName && team2score < team1score) return "bg-[#FF4E4D1A]"; // Loss
    return "bg-[#141F2B1A]"; // Draw
  };

  const filteredMatches = matchHistory.filter((match) => {
    switch (activeTab) {
      case "Wins":
        return (
          (match.team1 === team.name && match.team1score > match.team2score) ||
          (match.team2 === team.name && match.team2score > match.team1score)
        );
      case "Losses":
        return (
          (match.team1 === team.name && match.team1score < match.team2score) ||
          (match.team2 === team.name && match.team2score < match.team1score)
        );
      case "Draws":
        return match.team1score === match.team2score;
      default:
        return true; // Show all matches when "All" is selected
    }
  });

  return (
    <>
      <div className="bg-white mt-10 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <img
            src={assets.Back}
            alt="Back"
            onClick={() => window.history.back()}
            className="cursor-pointer"
          />
          <div className="flex items-center gap-4 cursor-pointer">
            <img
              src={team.icon}
              alt={`${team.name} icon`}
              className="w-10 h-10"
            />
            <div>
              <p className="text-xl font-PJSbold text-primary">{team.name}</p>
              <p className="text-sm font-PJSmedium text-secondary">
                {team.level}
              </p>
            </div>
          </div>

          <div className="ml-auto flex gap-4 text-center items-center">
            {[
              { label: "W", text: "Win", bg: "bg-[#35E7801A]" },
              { label: "D", text: "Draw", bg: "bg-[#141F2B1A]" },
              { label: "L", text: "Lose", bg: "bg-[#FF4E4D1A]" },
            ].map(({ label, text, bg }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center`}
                >
                  <p className="text-xs">{label}</p>
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <TabSelector
            tabs={[
              `All (${team.wins + team.losses + team.draws})`,
              `Wins (${team.wins})`,
              `Losses (${team.losses})`,
              `Draws (${team.draws})`,
            ]}
            initialActiveTab={`All (${team.wins + team.losses + team.draws})`}
            onTabClick={handleTabClick}
          />
        </div>

        <div className="flex gap-4 mt-5 text-center items-center">
          {getDisplayCounts().map(({ label, count, bg }) =>
            [...Array(count)].map((_, index) => (
              <div
                key={`${label}-${index}`}
                className="flex items-center gap-2"
              >
                <div
                  className={`w-6 h-6 ${bg} rounded-full flex items-center justify-center`}
                >
                  <p className="text-xs">{label}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white mt-10 rounded-xl p-7">
        {filteredMatches.map((match, index) => (
          <>
            <div className="mb-10">
              <MatchCompletedCard
                key={index}
                team1={match.team1}
                team2={match.team2}
                team1score={match.team1score}
                team2score={match.team2score}
                team1icon={match.team1icon}
                team2icon={match.team2icon}
                date={match.date}
                day={match.day}
                bgColor={getMatchBgColor(
                  team.name,
                  match.team1,
                  match.team2,
                  match.team1score,
                  match.team2score
                )}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Records;
