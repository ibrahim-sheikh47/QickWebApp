/* eslint-disable react/prop-types */
import assets from "../../../assets/assets";
import { useLocation } from "react-router-dom";
import TabSelector from "../../../components/TabSelector/TabSelector";
import { useState } from "react";
import MatchCompletedCard from "../../../components/MatchCompletedCard/MatchCompletedCard";
import { AppModal } from "../../../components";

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
  const [modalTab, setModalTab] = useState("Goals");

  const handleTabClick = (tab) => {
    const tabName = tab.split(" (")[0];
    setActiveTab(tabName);
  };

  const handleModalTab = (tab) => {
    setModalTab(tab);
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

  // Mock match history data with player statistics
  const matchHistory = [
    {
      team1: team.name,
      team2: "Barcelona",
      team1score: 2,
      team2score: 1,
      team1icon: team.icon,
      team2icon: assets.team7,
      date: "Jan 13th",
      day: "Saturday",
      players: {
        goals: [
          {
            name: "John Doe",
            image: assets.player1,
            team: team.name,
            count: 1,
          },
          {
            name: "Mike Smith",
            image: assets.player2,
            team: team.name,
            count: 1,
          },
          {
            name: "Leo Messi",
            image: assets.player3,
            team: "Barcelona",
            count: 1,
          },
        ],
        assists: [
          {
            name: "Tom Wilson",
            image: assets.player4,
            team: team.name,
            count: 2,
          },
          { name: "Pedri", image: assets.player3, team: "Barcelona", count: 1 },
        ],
        cleanSheets: [],
        cards: [
          {
            name: "Mike Smith",
            image: assets.player2,
            team: team.name,
            yellow: 1,
            red: 0,
          },
          {
            name: "Busquets",
            image: assets.player1,
            team: "Barcelona",
            yellow: 2,
            red: 0,
          },
        ],
        mvp: { name: "John Doe", image: assets.player1, team: team.name },
      },
    },
    {
      team1: "Barcelona",
      team2: team.name,
      team1score: 0,
      team2score: 0,
      team1icon: assets.team3,
      team2icon: team.icon,
      date: "Feb 14th",
      day: "Thursday",
      players: {
        goals: [],
        assists: [],
        cleanSheets: [
          { name: "David Smith", image: assets.player4, team: team.name },
          { name: "Ter Stegen", image: assets.player4, team: "Barcelona" },
        ],
        cards: [
          {
            name: "Tom Wilson",
            image: assets.player4,
            team: team.name,
            yellow: 2,
            red: 0,
          },
        ],
        mvp: { name: "David Smith", image: assets.player1, team: team.name },
      },
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

  const [openInfoModal, setInfoModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleInfo = (match) => {
    setSelectedMatch(match);
    setInfoModalOpen(true);
  };

  const PlayerStatCard = ({ player, statType, count }) => {
    const renderStatIcon = () => {
      switch (statType) {
        case "Goals":
          return <img src={assets.goals} alt="goals" />;
        case "Assists":
          return <img src={assets.assists} alt="assists" />;
        case "Clean Sheets":
          return <img src={assets.cleansheets} alt="clean sheets" />;
        case "MVP":
          return <img src={assets.star} alt="mvp" />;
        case "Cards":
          return (
            <div className="flex gap-2">
              {player.yellow > 0 && (
                <div className="flex items-center gap-3">
                  <p>{player.yellow}</p>
                  <img src={assets.yellowCard} alt="yellow card" />
                </div>
              )}
              {player.red > 0 && (
                <div className="flex items-center gap-3">
                  <p>{player.red}</p>
                  <img src={assets.redCard} alt="red card" />
                </div>
              )}
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="flex items-center gap-4">
        <img
          src={player.image}
          alt={player.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-PJSmedium">
            {player.name} ({player.team})
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {count !== undefined && (
            <span className="font-PJSmedium">{count}</span>
          )}
          {renderStatIcon()}
        </div>
      </div>
    );
  };

  const renderPlayerStats = () => {
    if (!selectedMatch) return null;

    const stats = selectedMatch.players;

    switch (modalTab) {
      case "Goals":
        return (
          <div className="space-y-6">
            {stats.goals.map((player, index) => (
              <PlayerStatCard
                key={index}
                player={player}
                statType="Goals"
                count={player.count}
              />
            ))}
          </div>
        );

      case "Assists":
        return (
          <div className="space-y-6">
            {stats.assists.map((player, index) => (
              <PlayerStatCard
                key={index}
                player={player}
                statType="Assists"
                count={player.count}
              />
            ))}
          </div>
        );

      case "Clean Sheets":
        return (
          <div className="space-y-6">
            {stats.cleanSheets.map((player, index) => (
              <PlayerStatCard
                key={index}
                player={player}
                statType="Clean Sheets"
              />
            ))}
          </div>
        );

      case "Cards":
        return (
          <div className="space-y-6">
            {stats.cards.map((player, index) => (
              <PlayerStatCard key={index} player={player} statType="Cards" />
            ))}
          </div>
        );

      case "MVP":
        return stats.mvp ? (
          <PlayerStatCard player={stats.mvp} statType="MVP" />
        ) : null;

      default:
        return null;
    }
  };
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
          <div key={index} className="mb-10">
            <MatchCompletedCard
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
              handleInfo={() => handleInfo(match)}
            />
          </div>
        ))}

        <AppModal
          modalopen={openInfoModal}
          onClose={() => setInfoModalOpen(false)}
          width={"auto"}
          height={"460px"}
          customStyles={{
            modal: {
              overflowY: "auto",
            },
          }}
        >
          {selectedMatch && (
            <>
              <p className="text-xl font-PJSbold">Match Facts</p>
              <div className="flex items-center mt-5">
                <p className="text-sm font-PJSmedium mr-3 w-2">
                  {selectedMatch.team1score}
                </p>
                <img
                  src={selectedMatch.team1icon}
                  alt={selectedMatch.team1}
                  className="w-8 h-8 mr-3"
                />
                <p className="text-sm font-PJSmedium">{selectedMatch.team1}</p>
              </div>
              <div className="flex items-center mt-5">
                <p className="text-sm font-PJSmedium mr-3 w-2">
                  {selectedMatch.team2score}
                </p>
                <img
                  src={selectedMatch.team2icon}
                  alt={selectedMatch.team2}
                  className="w-8 h-8 mr-3"
                />
                <p className="text-sm font-PJSmedium">{selectedMatch.team2}</p>
              </div>
              <TabSelector
                tabs={["Goals", "Assists", "Clean Sheets", "Cards", "MVP"]}
                initialActiveTab="Goals"
                onTabClick={handleModalTab}
              />
              <div className="mt-5">{renderPlayerStats()}</div>
            </>
          )}
        </AppModal>
      </div>
    </>
  );
};

export default Records;
