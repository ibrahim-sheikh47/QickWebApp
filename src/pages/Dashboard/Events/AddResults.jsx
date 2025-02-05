import { Button, Checkbox, Divider } from "antd";
import { useState } from "react";
import assets from "../../../assets/assets";
import { PlusCircleFilled } from "@ant-design/icons";
import AppModal from "../../../components/AppModal/AppModal";
import { useNavigate } from "react-router-dom";

const AddResults = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState({ team1: 0, team2: 0 });
  const [showPenalty, setShowPenalty] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("goals"); // New state to track modal type
  const [selectedTeam, setSelectedTeam] = useState({
    name: "",
    image: "",
    players: [],
  });

  // Mock player data for both teams
  const teamPlayers = {
    team1: [
      {
        id: 1,
        name: "Ronald ",
        image: assets.player1,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 2,
        name: "Lewis",
        image: assets.player2,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 3,
        name: "Ali",
        image: assets.player3,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 4,
        name: "Jackson",
        image: assets.player4,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 5,
        name: "Ibrahim",
        image: assets.player1,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 6,
        name: "Justin",
        image: assets.player2,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 7,
        name: "Moazzam",
        image: assets.player3,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 8,
        name: "Ahmad",
        image: assets.player4,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 9,
        name: "Nauman",
        image: assets.player1,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 10,
        name: "Raqim",
        image: assets.player2,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
    ],
    team2: [
      {
        id: 1,
        name: "Raqim",
        image: assets.player1,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 2,
        name: "Nauman",
        image: assets.player2,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 3,
        name: "Ahmad",
        image: assets.player3,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 4,
        name: "Moazzam",
        image: assets.player4,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 5,
        name: "Justin",
        image: assets.player1,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 6,
        name: "Ibrahim",
        image: assets.player2,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 7,
        name: "Jackson",
        image: assets.player3,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 8,
        name: "Ali",
        image: assets.player4,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 9,
        name: "Lewis",
        image: assets.player1,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
      {
        id: 10,
        name: "Ronaldo",
        image: assets.player2,
        score: 0,
        assists: 0,
        yellowCards: 0,
        redCard: false,
        isMVP: false,
      },
    ],
  };

  const updateScore = (team, increment) => {
    setScores((prevScores) => ({
      ...prevScores,
      [team]: Math.max(0, prevScores[team] + increment),
    }));
  };

  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [filteredAssistPlayers, setFilteredAssistPlayers] = useState([]); // New state for assists
  const [filteredCardPlayers, setFilteredCardPlayers] = useState([]);
  const [filteredMVPPlayers, setFilteredMVPPlayers] = useState([]);

  // Function to handle score updates for filtered players
  const updateFilteredPlayerScore = (playerId, change, type = "score") => {
    const updateFunction =
      type === "score" ? setFilteredPlayers : setFilteredAssistPlayers;
    const field = type === "score" ? "score" : "assists";

    updateFunction((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? { ...player, [field]: Math.max(0, player[field] + change) }
          : player
      )
    );

    // Synchronize with the main selectedTeam state
    setSelectedTeam((prevTeam) => {
      const updatedPlayers = prevTeam.players.map((player) =>
        player.id === playerId
          ? { ...player, [field]: Math.max(0, player[field] + change) }
          : player
      );
      return { ...prevTeam, players: updatedPlayers };
    });
  };

  const removePlayerFromFilteredList = (playerId, type) => {
    const stateSetters = {
      score: setFilteredPlayers,
      assists: setFilteredAssistPlayers,
      cards: setFilteredCardPlayers,
      mvp: setFilteredMVPPlayers,
    };

    const setState = stateSetters[type];

    if (setState) {
      setState((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerId)
      );
    } else {
      console.error("Invalid type provided");
    }
  };

  const updatePlayerYellowCards = (playerId, change) => {
    setSelectedTeam((prevTeam) => {
      const updatedPlayers = prevTeam.players.map((p) =>
        p.id === playerId
          ? {
              ...p,
              yellowCards: Math.min(2, Math.max(0, p.yellowCards + change)), // Prevent yellow cards from going over 2
            }
          : p
      );
      return { ...prevTeam, players: updatedPlayers };
    });
  };

  const updatePlayerRedCard = (playerId) => {
    setSelectedTeam((prevTeam) => {
      const updatedPlayers = prevTeam.players.map((p) =>
        p.id === playerId ? { ...p, redCard: !p.redCard } : p
      );
      return { ...prevTeam, players: updatedPlayers };
    });
  };

  // Function to handle MVP selection
  const updatePlayerMVP = (playerId) => {
    setSelectedTeam((prevTeam) => {
      const updatedPlayers = prevTeam.players.map(
        (p) =>
          p.id === playerId ? { ...p, isMVP: !p.isMVP } : { ...p, isMVP: false } // Ensure only one MVP is selected
      );
      return { ...prevTeam, players: updatedPlayers };
    });
  };

  const renderTeamScore = (teamKey, teamLabel, teamImage) => (
    <div className="flex items-center my-3">
      <img src={teamImage} alt={teamLabel} className="w-10 h-10" />
      <p className="ml-3 text-sm text-primary font-PJSmedium">{teamLabel}</p>
      <div className="ml-auto flex items-center gap-3">
        <div className="bg-secondaryTen w-8 h-8 rounded-full font-PJSmedium flex items-center justify-center">
          <Button
            onClick={() => updateScore(teamKey, -1)}
            className="border-none text-2xl mb-1"
            type="none"
          >
            -
          </Button>
        </div>

        <span className="text-sm font-PJSmedium text-center w-5">
          {scores[teamKey]}
        </span>
        <div className="bg-lime w-8 h-8 rounded-full font-PJSmedium flex items-center justify-center">
          <Button
            onClick={() => updateScore(teamKey, 1)}
            className="border-none text-2xl mb-1"
            type="none"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPlayerListButton = (
    teamKey,
    teamLabel,
    teamImage,
    type = "goals"
  ) => (
    <div className="flex items-center my-3">
      <img src={teamImage} alt={teamLabel} className="w-10 h-10" />
      <p className="ml-3">{teamLabel}</p>
      <div className="ml-auto">
        <Button
          type="none"
          className="bg-blue text-white rounded-full"
          onClick={() => {
            setSelectedTeam({
              name: teamLabel,
              image: teamImage,
              players: teamPlayers[teamKey],
            });
            setModalType(type);
            setModalOpen(true);
          }}
        >
          Players list
        </Button>
      </div>
    </div>
  );
  const renderFilteredPlayersByType = (type) => {
    const players =
      type === "score"
        ? filteredPlayers
        : type === "assists"
        ? filteredAssistPlayers
        : type === "cards"
        ? filteredCardPlayers
        : filteredMVPPlayers;

    return players.map((player) => (
      <div key={player.id} className="flex items-center justify-between my-5">
        <div className="flex items-center gap-3">
          <img
            src={player.image}
            alt={player.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-PJSmedium">{player.name}</span>
            <span className="text-xs text-secondary">{selectedTeam.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {type === "cards" ? (
            <>
              <div className="border-[#FFCC00] border rounded-full gap-2 w-[60px] h-[36px] flex items-center justify-center">
                <img src={assets.yellowCard} alt="" />
                <span>{player.yellowCards}</span>
              </div>
              {player.redCard && (
                <div className="border-redbutton border rounded-full w-[60px] h-[36px] flex items-center justify-center">
                  <img src={assets.redCard} alt="" />
                </div>
              )}
            </>
          ) : type === "mvp" ? null : (
            <>
              <div className="bg-secondaryTen w-8 h-8 rounded-full font-PJSmedium flex items-center justify-center">
                <Button
                  onClick={() => updateFilteredPlayerScore(player.id, -1, type)}
                  className="mb-1 border-none  text-2xl"
                  type="none"
                >
                  -
                </Button>
              </div>
              <span className="w-5 text-center">{player[type]}</span>
              <div className="bg-lime w-8 h-8 rounded-full font-PJSmedium flex items-center justify-center">
                <Button
                  onClick={() => updateFilteredPlayerScore(player.id, 1, type)}
                  className="mb-1 border-none  text-2xl"
                  type="none"
                >
                  +
                </Button>
              </div>
            </>
          )}
          <Button
            onClick={() => removePlayerFromFilteredList(player.id, type)}
            className="text-redbutton border-none text-lg"
            type="none"
            icon={<img src={assets.closeRed} alt="" />}
          />
        </div>
      </div>
    ));
  };

  const handleAddResults = () => {
    const results = {
      team1: scores.team1,
      team2: scores.team2,
      team1Players: filteredPlayers,
      team2Players: filteredAssistPlayers,
      team1Cards: filteredCardPlayers,
      team2Cards: filteredCardPlayers,
      team1MVP: filteredMVPPlayers,
      team2MVP: filteredMVPPlayers,
    };
    console.log(results);

    navigate("/Dashboard/Events/EventDetail", { state: { results } });
  };
  return (
    <div>
      <div className="mt-10 bg-white p-5 rounded-lg">
        <div className="flex gap-4 items-center text-2xl font-PJSbold">
          <img
            src={assets.Back}
            alt="Back"
            onClick={() => window.history.back()}
            className="cursor-pointer"
          />
          Add Results
        </div>
        <Divider />

        <div className="h-[180px] border rounded-lg border-secondaryTwenty px-5 py-3">
          <p className="text-[16px] font-PJSmedium">Match Score</p>
          <Divider className="p-0 mt-3 border-t-secondaryThirty" />

          {/* Team 1 Score */}
          {renderTeamScore("team1", "Tigers FC", assets.team1)}

          {/* Team 2 Score */}
          {renderTeamScore("team2", "Arsenal", assets.team2)}
        </div>

        {!showPenalty && (
          <div className="mt-5">
            <Button
              className="bg-lime hover:scale-105"
              shape="round"
              size={"large"}
              icon={<PlusCircleFilled />}
              type="none"
              onClick={() => setShowPenalty(true)}
            >
              Add Penalty Shootout
            </Button>
          </div>
        )}

        {showPenalty && (
          <div className="h-[180px] border rounded-lg border-secondaryTwenty px-5 py-3 mt-5 relative ">
            <Button
              onClick={() => setShowPenalty(false)}
              className="absolute top-2 right-2 border-none bg-secondaryTen rounded-full"
              icon={
                <img className=" w-4 h-4" src={assets.closeRed} alt="Close" />
              }
              type="none"
            />
            <p className="text-[16px] font-PJSmedium">
              Penalty Shootout Winner
            </p>
            <Divider className="p-0 mt-3 border-t-secondaryThirty" />

            {/* Team 1 Checkbox */}
            <div className="flex items-center my-3">
              <img src={assets.team1} alt="Team 1" className="w-10 h-10" />
              <p className="ml-3">Tigers FC</p>
              <div className="ml-auto">
                <Checkbox />
              </div>
            </div>

            {/* Team 2 Checkbox */}
            <div className="flex items-center my-3">
              <img src={assets.team2} alt="Team 2" className="w-10 h-10" />
              <p className="ml-3">Arsenal</p>
              <div className="ml-auto">
                <Checkbox />
              </div>
            </div>
          </div>
        )}

        {/* Goals Section */}
        <div className="border rounded-lg border-secondaryTwenty px-5 py-3 mt-5">
          <div className="flex">
            <p>Goals</p>
            <input
              type="search"
              className="border focus:outline-none rounded-full px-5 h-[40px] w-[300px] ml-auto"
              placeholder="Search Players"
            />
          </div>
          <Divider />
          {renderPlayerListButton("team1", "Tigers FC", assets.team1, "goals")}
          {renderPlayerListButton("team2", "Arsenal", assets.team2, "goals")}
          <Divider />
          {renderFilteredPlayersByType("score")}
        </div>

        {/* Assists Section */}
        <div className="border rounded-lg border-secondaryTwenty px-5 py-3 mt-5">
          <div className="flex">
            <p>Assists</p>
            <input
              type="search"
              className="border focus:outline-none rounded-full px-5 h-[40px] w-[300px] ml-auto"
              placeholder="Search Players"
            />
          </div>
          <Divider />
          {renderPlayerListButton(
            "team1",
            "Tigers FC",
            assets.team1,
            "assists"
          )}
          {renderPlayerListButton("team2", "Arsenal", assets.team2, "assists")}
          <Divider />
          {renderFilteredPlayersByType("assists")}
        </div>
        <div className="border rounded-lg border-secondaryTwenty px-5 py-3 mt-5">
          <div className="flex">
            <p>Cards</p>
            <input
              type="search"
              className="border focus:outline-none rounded-full px-5 h-[40px] w-[300px] ml-auto"
              placeholder="Search Players"
            />
          </div>
          <Divider />
          {renderPlayerListButton("team1", "Tigers FC", assets.team1, "cards")}
          {renderPlayerListButton("team2", "Arsenal", assets.team2, "cards")}
          <Divider />
          {renderFilteredPlayersByType("cards")}
        </div>
        <div className="border rounded-lg border-secondaryTwenty px-5 py-3 mt-5">
          <div className="flex">
            <p>MVP</p>
            <input
              type="search"
              className="border focus:outline-none rounded-full px-5 h-[40px] w-[300px] ml-auto"
              placeholder="Search Players"
            />
          </div>
          <Divider />
          {renderPlayerListButton("team1", "Tigers FC", assets.team1, "mvp")}
          {renderPlayerListButton("team2", "Arsenal", assets.team2, "mvp")}
          <Divider />
          {renderFilteredPlayersByType("mvp")}
        </div>

        <Button
          className="rounded-full bg-lime mt-10 w-full border-none h-[60px]"
          type="submit"
          onClick={handleAddResults}
        >
          Add Results
        </Button>
      </div>

      <AppModal
        modalopen={modalOpen}
        onClose={() => setModalOpen(false)}
        height="auto"
        width="500px"
        customStyles={{
          modal: { padding: "20px" },
          overlay: { overflowY: "scroll" },
        }}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <img
              src={selectedTeam.image}
              alt={selectedTeam.name}
              className="w-10 h-10"
            />
            <h3 className="text-lg font-PJSbold">{selectedTeam.name}</h3>
          </div>
          <div className="w-full mt-5">
            <div className="flex items-center justify-between text-[16px] font-PJSmedium">
              <p>Players</p>
              {modalType === "cards" ? (
                <>
                  <img src={assets.redCard} className alt="" />
                  <img src={assets.yellowCard} className="mr-10" alt="" />
                </>
              ) : modalType === "mvp" ? (
                <p>MVP</p>
              ) : (
                <p>{modalType === "goals" ? "Goals" : "Assists"}</p>
              )}
            </div>
            <Divider className="mt-2 border-t-secondaryTwenty" />
            {selectedTeam.players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between my-5"
              >
                <div className="flex items-center gap-3">
                  <span>{player.id}</span>
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col gap-0">
                    <span className="text-sm font-PJSmedium">
                      {player.name}
                    </span>
                    <span className="text-[10px] text-secondary font-PJSmedium">
                      {selectedTeam.name}
                    </span>
                  </div>
                </div>
                {modalType === "cards" ? (
                  <div className="flex items-center gap-28">
                    <Checkbox
                      checked={player.redCard}
                      onChange={() => updatePlayerRedCard(player.id)}
                    />
                    <div className="flex items-center gap-3">
                      <div className="bg-secondaryTen w-8 h-8 rounded-full font-PJSmedium flex items-center justify-center">
                        <Button
                          onClick={() => updatePlayerYellowCards(player.id, -1)}
                          className="border-none text-2xl mb-1"
                          type="none"
                        >
                          -
                        </Button>
                      </div>
                      <span className="w-5 text-center">
                        {player.yellowCards}
                      </span>
                      <div className="bg-lime w-8 h-8 rounded-full font-PJSmedium flex items-center justify-center">
                        <Button
                          onClick={() => updatePlayerYellowCards(player.id, 1)}
                          className="border-none text-2xl mb-1"
                          type="none"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : modalType === "mvp" ? (
                  <Checkbox
                    checked={player.isMVP}
                    onChange={() => updatePlayerMVP(player.id)}
                  />
                ) : (
                  /* Existing goals/assists controls */
                  <div className="flex items-center gap-3">
                    <div className="bg-secondaryTen w-8 h-8 rounded-full flex items-center justify-center">
                      <Button
                        onClick={() =>
                          setSelectedTeam((prevTeam) => {
                            const field =
                              modalType === "goals" ? "score" : "assists";
                            const updatedPlayers = prevTeam.players.map((p) =>
                              p.id === player.id
                                ? { ...p, [field]: Math.max(0, p[field] - 1) }
                                : p
                            );
                            return { ...prevTeam, players: updatedPlayers };
                          })
                        }
                        className="text-2xl border-none mb-1"
                        type="none"
                      >
                        -
                      </Button>
                    </div>
                    <span className="text-sm font-PJSmedium text-center w-5">
                      {modalType === "goals" ? player.score : player.assists}
                    </span>
                    <div className="bg-lime w-8 h-8 rounded-full flex items-center justify-center">
                      <Button
                        onClick={() =>
                          setSelectedTeam((prevTeam) => {
                            const field =
                              modalType === "goals" ? "score" : "assists";
                            const updatedPlayers = prevTeam.players.map((p) =>
                              p.id === player.id
                                ? { ...p, [field]: p[field] + 1 }
                                : p
                            );
                            return { ...prevTeam, players: updatedPlayers };
                          })
                        }
                        className="text-2xl border-none mb-1"
                        type="none"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Button
            type="none"
            className="mt-5 h-[54px] font-PJSmedium bg-lime border-none rounded-full"
            onClick={() => {
              if (modalType === "cards") {
                const playersWithCards = selectedTeam.players.filter(
                  (player) => player.yellowCards > 0 || player.redCard
                );
                setFilteredCardPlayers(playersWithCards);
              } else if (modalType === "mvp") {
                const mvpPlayers = selectedTeam.players.filter(
                  (player) => player.isMVP
                );
                setFilteredMVPPlayers(mvpPlayers);
              } else if (modalType === "goals") {
                const playersWithScores = selectedTeam.players.filter(
                  (player) => player.score > 0
                );
                setFilteredPlayers(playersWithScores);
              } else {
                const playersWithAssists = selectedTeam.players.filter(
                  (player) => player.assists > 0
                );
                setFilteredAssistPlayers(playersWithAssists);
              }
              setModalOpen(false);
            }}
          >
            Add
          </Button>
        </div>
      </AppModal>
    </div>
  );
};

export default AddResults;
