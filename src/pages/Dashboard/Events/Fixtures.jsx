/* eslint-disable no-unused-vars */
import { useState } from "react";
import AddTeamModal from "../../../components/AddTeamModal/AddTeamModal";
import AddTeamSection from "../../../components/AddTeamSection/AddTeamSection";
import TeamSelectionCard from "../../../components/TeamSelectionCard/TeamSelectionCard";
import { teams } from "../../../constants/leagueIndex";
import assets from "../../../assets/assets";
import { Button } from "antd";
import { AppModal } from "../../../components";

const Fixtures = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    team1: false,
    team2: false,
  });
  const handleToggleModal = (teamType, isOpen) => {
    setIsModalOpen((prevState) => ({
      ...prevState,
      [teamType]: isOpen,
    }));
  };
  const [cards, setCards] = useState([
    { id: 1, team1: null, team2: null }, // Initial card
  ]);
  const handleTeamSelection = (teamId, teamType, cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, [teamType]: teamId } : card
      )
    );
  };
  const handleAddCard = () => {
    setCards((prevCards) => [
      ...prevCards,
      { id: prevCards.length + 1, team1: null, team2: null },
    ]);
  };
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isMatchOptionModalOpen, setIsMatchOptionModalOpen] = useState(false);

  const handleOptionClick = () => {
    setIsOptionModalOpen(true);
  };

  const handleMatchOption = () => {
    setIsOptionModalOpen(false);
    setIsMatchOptionModalOpen(true);
  };

  const [activeMatchday, setActiveMatchday] = useState("Matchday 1");
  const [selectedTeams, setSelectedTeams] = useState({
    team1: null,
    team2: null,
  });
  return (
    <div>
      {cards.map((card) => (
        <div key={card.id} className="mb-4">
          {!(card.team1 && card.team2) ? (
            <AddTeamSection
              handleToggleModal={(teamType, isOpen) =>
                setIsModalOpen((prevState) => ({
                  ...prevState,
                  [`${teamType}-${card.id}`]: isOpen,
                }))
              }
            />
          ) : (
            <TeamSelectionCard
              team1={card.team1}
              team2={card.team2}
              teams={teams}
              assets={assets}
              handleOptionClick={handleOptionClick}
            />
          )}

          {/* Team 1 Modal */}
          <AddTeamModal
            isModalOpen={isModalOpen[`team1-${card.id}`]}
            onClose={() =>
              setIsModalOpen((prevState) => ({
                ...prevState,
                [`team1-${card.id}`]: false,
              }))
            }
            teamType="team1"
            teams={teams}
            selectedTeams={cards.find((c) => c.id === card.id) || {}}
            handleTeamSelection={(teamId) =>
              handleTeamSelection(teamId, "team1", card.id)
            }
            activeMatchday={activeMatchday}
          />

          {/* Team 2 Modal */}
          <AddTeamModal
            isModalOpen={isModalOpen[`team2-${card.id}`]}
            onClose={() =>
              setIsModalOpen((prevState) => ({
                ...prevState,
                [`team2-${card.id}`]: false,
              }))
            }
            teamType="team2"
            teams={teams}
            selectedTeams={cards.find((c) => c.id === card.id) || {}}
            handleTeamSelection={(teamId) =>
              handleTeamSelection(teamId, "team2", card.id)
            }
            activeMatchday={activeMatchday}
          />
        </div>
      ))}
      <Button
        onClick={handleAddCard}
        type="primary"
        className="mt-5 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Another Match
      </Button>
      {isOptionModalOpen && (
        <AppModal
          modalopen={isOptionModalOpen}
          onClose={() => setIsOptionModalOpen(false)}
          width={"500px"}
          height={"372px"}
        >
          {" "}
          <p className="font-PJSbold text-lg">Match Options</p>{" "}
          <div className="flex flex-col gap-5 mt-5 text-[16px] ">
            {" "}
            <Button
              onClick={handleMatchOption}
              className="h-14 rounded-lg font-PJSmedium"
            >
              {" "}
              Match Option{" "}
            </Button>{" "}
            <Button className="h-14 rounded-lg font-PJSmedium">
              {" "}
              Match Facts{" "}
            </Button>{" "}
            <Button className="h-14 rounded-lg font-PJSmedium">
              {" "}
              Forfeit{" "}
            </Button>{" "}
            <Button
              type="none"
              className="h-14 rounded-full bg-secondaryTen font-PJSmedium"
            >
              {" "}
              Cancel{" "}
            </Button>{" "}
          </div>{" "}
        </AppModal>
      )}{" "}
      {isMatchOptionModalOpen && (
        <AppModal
          modalopen={isMatchOptionModalOpen}
          onClose={() => setIsMatchOptionModalOpen(false)}
          width={"500px"}
          height={"318px"}
        >
          {" "}
          <p className="font-PJSbold text-lg">Match Options</p>{" "}
          <div className="flex flex-col gap-5 mt-5 text-[16px] ">
            {" "}
            <Button className="h-14 rounded-lg font-PJSmedium">
              {" "}
              Edit Score{" "}
            </Button>{" "}
            <Button className="h-14 rounded-lg font-PJSmedium">
              {" "}
              Reschedule{" "}
            </Button>{" "}
            <Button
              type="none"
              className="h-14 rounded-full bg-secondaryTen font-PJSmedium text-redbutton"
            >
              {" "}
              Remove Team{" "}
            </Button>{" "}
          </div>{" "}
        </AppModal>
      )}{" "}
      <AddTeamModal
        isModalOpen={isModalOpen.team1}
        onClose={() => handleToggleModal("team1", false)}
        teamType="team1"
        teams={teams}
        selectedTeams={selectedTeams}
        handleTeamSelection={handleTeamSelection}
        activeMatchday={activeMatchday}
      />{" "}
      <AddTeamModal
        isModalOpen={isModalOpen.team2}
        onClose={() => handleToggleModal("team2", false)}
        teamType="team2"
        teams={teams}
        selectedTeams={selectedTeams}
        handleTeamSelection={handleTeamSelection}
        activeMatchday={activeMatchday}
      />{" "}
    </div>
  );
};

export default Fixtures;
