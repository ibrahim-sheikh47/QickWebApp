import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamSelectionCard from "../../../../components/TeamSelectionCard/TeamSelectionCard";
import AddTeamSection from "../../../../components/AddTeamSection/AddTeamSection";
import AddTeamModal from "../../../../components/AddTeamModal/AddTeamModal";
import assets from "../../../../assets/assets";
import { teams } from "../../../../constants/leagueIndex";

const KnockoutTab = () => {
  const navigate = useNavigate();
  const [selectedTeams, setSelectedTeams] = useState({
    team1: null,
    team2: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTeamType, setActiveTeamType] = useState(null);

  const handleToggleModal = (teamType, open) => {
    setActiveTeamType(teamType);
    setIsModalOpen(open);
  };

  const getCustomStyle = (team1score, team2score) => {
    return team1score !== null && team2score !== null
      ? "max-w-[322px] border-[#35E78050] bg-[#35E78010] border-2"
      : "max-w-[322px] border-gray-300 bg-gray-100 border-2";
  };

  // Helper to determine winner of a match
  const getWinner = (match) => {
    if (match?.team1score > match?.team2score) return match.team1;
    if (match?.team2score > match?.team1score) return match.team2;
    return null;
  };

  // Helper to determine loser of a match
  const getLoser = (match) => {
    if (match?.team1score > match?.team2score) return match.team2;
    if (match?.team2score > match?.team1score) return match.team1;
    return null;
  };

  // Mock data structure for matches (you would replace this with your actual data)
  const quarterFinals = {
    g1: {
      team1: 1,
      team2: 2,
      team1score: 2,
      team2score: 1,
      date: "Monday, Jan 11th",
      time: "5-6 pm",
      field: "Jr Field",
    },
    g2: {
      team1: 3,
      team2: 4,
      team1score: 1,
      team2score: 2,
      date: "Monday, Jan 11th",
      time: "7-8 pm",
      field: "Main Field",
    },
    g3: {
      team1: 5,
      team2: 6,
      team1score: 2,
      team2score: 1,
      date: "Tuesday, Jan 12th",
      time: "3-4 pm",
      field: "East Field",
    },
    g4: {
      team1: 7,
      team2: 8,
      team1score: null,
      team2score: null,
      date: "Tuesday, Jan 12th",
      time: "4-5 pm",
      field: "West Field",
    },
  };
  const semiFinals = {
    g1: {
      team1: getWinner(quarterFinals.g1),
      team2: getWinner(quarterFinals.g2),
      team1score: null,
      team2score: null,
    },
    g2: {
      team1: getWinner(quarterFinals.g3),
      team2: getWinner(quarterFinals.g4),
      team1score: null,
      team2score: null,
    },
  };

  const thirdPlace = {
    team1: getLoser(semiFinals.g1),
    team2: getLoser(semiFinals.g2),
    team1score: null,
    team2score: null,
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="space-y-4">
        <p className="font-bold text-lg">QUARTER FINALS</p>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-PJSmedium text-secondary">
              QF : G1
            </p>
            <TeamSelectionCard
              customStyle={getCustomStyle(
                quarterFinals.g1.team1score,
                quarterFinals.g1.team2score
              )}
              {...quarterFinals.g1}
              isKnockout={true}
              teams={teams}
              assets={assets}
              handleOptionClick={() =>
                navigate("/Dashboard/Events/EventDetail/AddResults")
              }
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-PJSmedium text-secondary">
              QF : G2
            </p>
            <TeamSelectionCard
              customStyle={getCustomStyle(
                quarterFinals.g2.team1score,
                quarterFinals.g2.team2score
              )}
              {...quarterFinals.g2}
              isKnockout={true}
              teams={teams}
              assets={assets}
              handleOptionClick={() =>
                navigate("/Dashboard/Events/EventDetail/AddResults")
              }
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-PJSmedium text-secondary">
              QF : G3
            </p>
            <TeamSelectionCard
              customStyle={getCustomStyle(
                quarterFinals.g3.team1score,
                quarterFinals.g3.team2score
              )}
              {...quarterFinals.g3}
              isKnockout={true}
              teams={teams}
              assets={assets}
              handleOptionClick={() =>
                navigate("/Dashboard/Events/EventDetail/AddResults")
              }
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-PJSmedium text-secondary">
              QF : G4
            </p>
            <AddTeamSection
              customStyle="max-w-[322px]"
              handleToggleModal={handleToggleModal}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-bold text-lg">SEMI FINALS</p>
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-PJSmedium text-secondary">
              SF : G1
            </p>
            <TeamSelectionCard
              customStyle={getCustomStyle(
                semiFinals.g1.team1score,
                semiFinals.g1.team2score
              )}
              {...semiFinals.g1}
              isKnockout={true}
              teams={teams}
              assets={assets}
              handleOptionClick={() =>
                navigate("/Dashboard/Events/EventDetail/AddResults")
              }
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-PJSmedium text-secondary">
              SF : G2
            </p>
            <TeamSelectionCard
              customStyle={getCustomStyle(
                semiFinals.g2.team1score,
                semiFinals.g2.team2score
              )}
              {...semiFinals.g2}
              isKnockout={true}
              teams={teams}
              assets={assets}
              handleOptionClick={() =>
                navigate("/Dashboard/Events/EventDetail/AddResults")
              }
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="font-bold text-lg">3RD PLACE</p>
        <div className="space-y-2">
          <p className="mb-2 text-sm font-PJSmedium text-secondary">
            3rd place
          </p>
          <TeamSelectionCard
            customStyle={getCustomStyle(
              thirdPlace.team1score,
              thirdPlace.team2score
            )}
            {...thirdPlace}
            isKnockout={true}
            teams={teams}
            assets={assets}
            handleOptionClick={() =>
              navigate("/Dashboard/Events/EventDetail/AddResults")
            }
          />
        </div>
      </div>

      {/* AddTeamModal will be shown based on modal state */}
      <AddTeamModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teamType={activeTeamType}
        teams={teams}
        selectedTeams={selectedTeams}
        handleTeamSelection={(teamId, teamType) => {
          setSelectedTeams((prev) => ({ ...prev, [teamType]: teamId }));
          setIsModalOpen(false);
        }}
        activeMatchday="Quarter Final"
      />
    </div>
  );
};

export default KnockoutTab;
