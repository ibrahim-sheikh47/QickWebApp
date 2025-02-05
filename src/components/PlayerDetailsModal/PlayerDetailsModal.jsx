/* eslint-disable react/prop-types */
import { Button, Divider } from "antd";
import AppModal from "../AppModal/AppModal";
import assets from "../../assets/assets";

const statTypeIcons = {
  Goals: assets.goals,
  Assists: assets.assists,
  "Clean Sheets": assets.cleansheets,
  "MVP Awards": assets.star,
  Cards: assets.yellowCard,
};

const goalData = [
  {
    opponentTeam: "Bayern",
    opponentIcon: assets.team6,
    matchDay: "Matchday 1",
    value: 2,
  },
  {
    opponentTeam: "Barcelona",
    opponentIcon: assets.team7,
    matchDay: "Matchday 2",
    value: 1,
  },
];

const assistData = [
  {
    opponentTeam: "Real Madrid",
    opponentIcon: assets.team4,
    matchDay: "Matchday 1",
    value: 1,
  },
  {
    opponentTeam: "Liverpool",
    opponentIcon: assets.team3,
    matchDay: "Matchday 2",
    value: 0,
  },
];

const cleanSheetsData = [
  {
    opponentTeam: "Juventus",
    opponentIcon: assets.team1,
    matchDay: "Matchday 1",
  },
  {
    opponentTeam: "Chelsea",
    opponentIcon: assets.team2,
    matchDay: "Matchday 2",
  },
];

const mvpData = [
  {
    opponentTeam: "Arsenal",
    opponentIcon: assets.team5,
    matchDay: "Matchday 1",
    value: 1,
  },
  {
    opponentTeam: "Al Nassr FC",
    opponentIcon: assets.team6,
    matchDay: "Matchday 2",
    value: 0,
  },
];

const cardsData = [
  {
    opponentTeam: "Villareal",
    opponentIcon: assets.team5,
    matchDay: "Matchday 1",
    yellowCards: 1,
    redCards: 0,
  },
  {
    opponentTeam: "Manchester City",
    opponentIcon: assets.team6,
    matchDay: "Matchday 2",
    yellowCards: 0,
    redCards: 0,
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
  const filteredMatchData = {
    Goals: goalData,
    Assists: assistData,
    "Clean Sheets": cleanSheetsData,
    "MVP Awards": mvpData,
    Cards: cardsData,
  }[statType].filter(
    (match) =>
      match.value > 0 || statType === "Clean Sheets" || statType === "Cards"
  );

  return (
    <AppModal
      title="Player Details"
      modalopen={isVisible}
      onClose={onClose}
      width={"500px"}
      height={"auto"}
    >
      <div className="flex items-center">
        <img src={dp} alt={player} className="rounded-full mr-3 w-10 h-10" />
        <div>
          <p className=" text-primary">
            <span className="font-PJSbold text-xl">{player} </span>|
            <span className="font-PJSmedium text-sm">
              {" "}
              {""} {team}{" "}
            </span>
          </p>
          <p className="text-sm font-PJSmedium text-secondary">
            {value} {statType} in {leagueName}
          </p>
        </div>
      </div>

      <div className="mt-8">
        {filteredMatchData.length > 0 ? (
          filteredMatchData.map((match, index) => (
            <>
              <div key={index} className="flex items-center">
                <img
                  src={match.opponentIcon}
                  alt={match.opponentTeam}
                  className="rounded-full mr-3 w-10 h-10"
                />
                <div className="flex-1 font-PJSmedium">
                  <p className="text-primary text-sm">{match.opponentTeam}</p>
                  <p className="text-secondary text-xs">{match.matchDay}</p>
                </div>
                {statType === "Cards" ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <img src={assets.yellowCard} alt="Yellow Card" />
                      <span className="text-xs font-PJSmedium">
                        {match.yellowCards}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={assets.redCard} alt="Red Card" />
                      <span className="text-xs font-PJSmedium">
                        {match.redCards}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-PJSmedium">
                      {match.value}
                    </span>
                    <img src={statTypeIcons[statType]} alt="" />
                  </div>
                )}
              </div>
              {index !== filteredMatchData.length - 1 && <Divider />}
            </>
          ))
        ) : (
          <p>No match data available for {statType}.</p>
        )}
      </div>

      <div className="mt-10">
        <Button
          onClick={onClose}
          className="w-full bg-lime rounded-full h-[54px]"
          type="none"
        >
          Done
        </Button>
      </div>
    </AppModal>
  );
};

export default PlayerDetailsModal;
