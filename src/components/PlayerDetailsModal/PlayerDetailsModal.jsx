/* eslint-disable react/prop-types */
import { Button } from "antd";
import AppModal from "../AppModal/AppModal";

// Example mapping for stat types
const statTypeIcons = {
  Goals: "⚽",
  Assists: "🎯",
  "Clean Sheets": "🧤",
  "MVP Awards": "🏅",
};

// Example opponent team data
const matchData = [
  {
    opponentTeam: "Team A",
    opponentIcon: "https://via.placeholder.com/40",
    matchDay: "Matchday 1",
    stats: {
      Goals: 2,
      Assists: 1,
      "Clean Sheets": 0,
      "MVP Awards": 1,
    },
  },
  {
    opponentTeam: "Team B",
    opponentIcon: "https://via.placeholder.com/40",
    matchDay: "Matchday 2",
    stats: {
      Goals: 1,
      Assists: 0,
      "Clean Sheets": 1,
      "MVP Awards": 0,
    },
  },
];

const PlayerDetailsModal = ({
  isVisible,
  player,
  team,
  dp,
  statType,
  value,
  onClose,
  leagueName,
}) => {
  // Filter match data by statType
  const filteredMatchData = matchData
    .filter((match) => match.stats[statType] > 0) // Show matches where the stat value is greater than 0
    .map((match) => ({
      opponentTeam: match.opponentTeam,
      opponentIcon: match.opponentIcon,
      matchDay: match.matchDay,
      statValue: match.stats[statType],
      statIcon: statTypeIcons[statType],
    }));

  return (
    <AppModal
      title="Player Details"
      modalopen={isVisible}
      onClose={onClose}
      width={"auto"}
      height={"auto"}
    >
      <div className="flex items-center">
        <img
          src={dp}
          alt={player}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            marginRight: "12px",
          }}
        />
        <div>
          <p>
            {player} | {team}
          </p>
          <p>
            {value} {statType} in {leagueName}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3>Match Details:</h3>
        {filteredMatchData.length > 0 ? (
          filteredMatchData.map((match, index) => (
            <div
              key={index}
              className="flex items-center mb-2 p-2 border rounded-lg"
            >
              <img
                src={match.opponentIcon}
                alt={match.opponentTeam}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "12px",
                }}
              />
              <div className="flex-1">
                <p className="text-primary font-bold">{match.opponentTeam}</p>
                <p className="text-secondary text-sm">{match.matchDay}</p>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{match.statIcon}</span>
                <span className="font-bold">{match.statValue}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No match data available for {statType}.</p>
        )}
      </div>

      <div className="mt-4">
        <Button onClick={onClose}>Done</Button>
      </div>
    </AppModal>
  );
};

export default PlayerDetailsModal;
