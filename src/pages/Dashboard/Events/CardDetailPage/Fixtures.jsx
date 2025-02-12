/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import assets from "../../../../assets/assets";
import TabSelector from "../../../../components/TabSelector/TabSelector";
import AddTeamSection from "../../../../components/AddTeamSection/AddTeamSection";
import AddTeamModal from "../../../../components/AddTeamModal/AddTeamModal";
import TeamSelectionCard from "../../../../components/TeamSelectionCard/TeamSelectionCard";
import { teams } from "../../../../constants/leagueIndex";
import { AppModal } from "../../../../components";

const MATCHDAY_TABS = [
  "Matchday 1",
  "Matchday 2",
  "Matchday 3",
  "Matchday 4",
  "Matchday 5",
  "Matchday 6",
  "Matchday 7",
];

const GROUPS = ["Group A", "Group B", "Group C", "Group D"];

const Fixtures = ({ eventType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const formValues = location.state || {};

  // Store matches for each matchday separately
  const [matchdayCards, setMatchdayCards] = useState(() => {
    const initialMatchdays = {};
    MATCHDAY_TABS.forEach((matchday) => {
      initialMatchdays[matchday] = [{ id: 1, team1: null, team2: null }];
    });
    return initialMatchdays;
  });

  // Store matches for each group and matchday separately
  const [groupFixtures, setGroupFixtures] = useState(() => {
    const initialGroups = {};
    GROUPS.forEach((group) => {
      const groupMatchdays = {};
      MATCHDAY_TABS.forEach((matchday) => {
        groupMatchdays[matchday] = [{ id: 1, team1: null, team2: null }];
      });
      initialGroups[group] = groupMatchdays;
    });
    return initialGroups;
  });

  const [isModalOpen, setIsModalOpen] = useState({});
  const [activeMatchday, setActiveMatchday] = useState("Matchday 1");
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isMatchOptionModalOpen, setIsMatchOptionModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleToggleModal = (teamType, cardId, isOpen, group = null) => {
    const modalKey = group
      ? `${teamType}-${cardId}-${group}-${activeMatchday}`
      : `${teamType}-${cardId}-${activeMatchday}`;

    setIsModalOpen((prev) => ({
      ...prev,
      [modalKey]: isOpen,
    }));
  };

  const handleTeamSelection = (teamId, teamType, cardId, group = null) => {
    if (group) {
      setGroupFixtures((prevGroups) => ({
        ...prevGroups,
        [group]: {
          ...prevGroups[group],
          [activeMatchday]: prevGroups[group][activeMatchday].map((card) =>
            card.id === cardId ? { ...card, [teamType]: teamId } : card
          ),
        },
      }));
    } else {
      setMatchdayCards((prevMatchdays) => ({
        ...prevMatchdays,
        [activeMatchday]: prevMatchdays[activeMatchday].map((card) =>
          card.id === cardId ? { ...card, [teamType]: teamId } : card
        ),
      }));
    }
  };

  const handleAddCard = () => {
    setMatchdayCards((prevMatchdays) => ({
      ...prevMatchdays,
      [activeMatchday]: [
        ...prevMatchdays[activeMatchday],
        {
          id: prevMatchdays[activeMatchday].length + 1,
          team1: null,
          team2: null,
        },
      ],
    }));
  };

  const handleAddGroupMatch = (group) => {
    setGroupFixtures((prevGroups) => ({
      ...prevGroups,
      [group]: {
        ...prevGroups[group],
        [activeMatchday]: [
          ...prevGroups[group][activeMatchday],
          {
            id: prevGroups[group][activeMatchday].length + 1,
            team1: null,
            team2: null,
          },
        ],
      },
    }));
  };

  const handleMatchdayTabChange = (tab) => {
    setActiveMatchday(tab);
  };

  const handleEditScore = (match) => {
    navigate("/Dashboard/Events/EventDetail/AddResults", {
      state: {
        selectedTeams: [{ team1: match.team1?.name, team2: match.team2?.name }],
      },
    });
  };

  const handleOptionClick = (match, isGroup = false) => {
    setSelectedMatch({ ...match, isGroup });
    setIsOptionModalOpen(true);
  };

  const [removeTeamModal, setRemoveTeamModal] = useState(false);

  const [showFixtureModal, setShowFixtureModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  const handleButtonClick = () => {
    if (eventType === "Group Stage + Knockouts") {
      setShowGroupModal(true);
      setShowFixtureModal(false);
    } else {
      setShowFixtureModal(true);
      setShowGroupModal(false);
    }
  };

  return (
    <div>
      <div className="bg-white h-[150px] mt-10 rounded-xl p-4">
        <div className="flex items-baseline gap-4">
          <img
            src={assets.Back}
            alt="Back"
            onClick={() => window.history.back()}
            className="cursor-pointer"
          />
          <p className="text-2xl font-PJSbold text-primary">
            {formValues.leagueName || "League Name Here"}
          </p>
          <span className="text-xs font-PJSregular text-secondary">
            Last Update: {"time here"}
          </span>

          <div className="flex items-center ml-auto gap-4">
            <>
              {" "}
              <Button
                type="none"
                className="rounded-full h-[42px] border-secondaryThirty border-2"
                icon={<img src={assets.randomize} />}
                onClick={handleButtonClick}
              >
                {eventType === "Group Stage + Knockouts" ? (
                  <>Randomize Groups</>
                ) : (
                  <>Randomize Fixtures</>
                )}
              </Button>
              {showFixtureModal && (
                <AppModal
                  modalopen={showFixtureModal}
                  onClose={() => setShowFixtureModal(false)}
                >
                  <h2>Fixture Modal</h2>
                  {/* Your fixture content here */}
                </AppModal>
              )}
              {/* Group Modal */}
              {showGroupModal && (
                <AppModal
                  modalopen={showGroupModal}
                  onClose={() => setShowGroupModal(false)}
                  width={"500px"}
                  height={"250px"}
                >
                  <h2 className="font-PJSbold text-xl text-primary">
                    Randomize Groups
                  </h2>
                  <p className="font-PJSregular text-sm text-secondary mt-3">
                    By proceeding, teams will be randomly assigned to groups. If
                    the results don’t feel right, you can repeat the process
                    unless matches have been added or the tournament has
                    started. Alternatively, you can manually assign teams to
                    groups.
                  </p>
                  <Button
                    type="none"
                    className="rounded-full h-[42px] bg-lime w-full mt-10"
                    onClick={() => setShowGroupModal(false)}
                  >
                    Randomize Group Stage
                  </Button>
                </AppModal>
              )}
            </>

            <div className="relative">
              <input
                type="search"
                className="font-PJSregular text-[14px] cursor-pointer relative z-10 h-11 w-11 rounded-full border-2 border-secondaryThirty bg-transparent pl-11 outline-none focus:w-[220px] focus:cursor-text focus:pr-4"
              />
              <img
                src={assets.search}
                alt=""
                className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5"
              />
            </div>
            <Button
              type="none"
              className="rounded-full h-[42px] border-secondaryThirty border-2 font-PJSmedium"
              icon={<img src={assets.chatBlack} />}
              onClick={() => navigate("/Dashboard/Chats")}
            >
              Chat
            </Button>
          </div>
        </div>
        <TabSelector
          tabs={MATCHDAY_TABS}
          initialActiveTab={"Matchday 1"}
          onTabClick={handleMatchdayTabChange}
        />
      </div>

      <div className="bg-white mt-5 rounded-xl p-4">
        {eventType === "Group Stage + Knockouts" ? (
          <div className="grid grid-cols-2 gap-4">
            {GROUPS.map((group) => (
              <div key={group} className=" p-4 rounded-lg shadow-custom">
                <p className="text-lg font-bold">{group}</p>
                {groupFixtures[group][activeMatchday].map((card) => (
                  <div
                    key={`${group}-${activeMatchday}-${card.id}`}
                    className="mb-4"
                  >
                    {!(card.team1 && card.team2) ? (
                      <AddTeamSection
                        handleToggleModal={(teamType, isOpen) =>
                          handleToggleModal(teamType, card.id, isOpen, group)
                        }
                      />
                    ) : (
                      <div className="mt-5">
                        <TeamSelectionCard
                          team1={card.team1}
                          team1score={1}
                          team2score={2}
                          team2={card.team2}
                          teams={teams}
                          assets={assets}
                          handleOptionClick={() =>
                            handleOptionClick(card, true)
                          }
                        />
                      </div>
                    )}

                    <AddTeamModal
                      isModalOpen={
                        isModalOpen[
                          `team1-${card.id}-${group}-${activeMatchday}`
                        ]
                      }
                      onClose={() =>
                        handleToggleModal("team1", card.id, false, group)
                      }
                      teamType="team1"
                      teams={teams}
                      selectedTeams={card}
                      handleTeamSelection={(teamId) =>
                        handleTeamSelection(teamId, "team1", card.id, group)
                      }
                      activeMatchday={activeMatchday}
                    />

                    <AddTeamModal
                      isModalOpen={
                        isModalOpen[
                          `team2-${card.id}-${group}-${activeMatchday}`
                        ]
                      }
                      onClose={() =>
                        handleToggleModal("team2", card.id, false, group)
                      }
                      teamType="team2"
                      teams={teams}
                      selectedTeams={card}
                      handleTeamSelection={(teamId) =>
                        handleTeamSelection(teamId, "team2", card.id, group)
                      }
                      activeMatchday={activeMatchday}
                    />
                  </div>
                ))}
                <Button
                  onClick={() => handleAddGroupMatch(group)}
                  type="none"
                  className="mt-2 bg-blue text-white px-4 py-2 rounded-full"
                >
                  Add Match
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <>
            {matchdayCards[activeMatchday].map((card) => (
              <div key={`${activeMatchday}-${card.id}`} className="mb-4">
                {!(card.team1 && card.team2) ? (
                  <AddTeamSection
                    handleToggleModal={(teamType, isOpen) =>
                      handleToggleModal(teamType, card.id, isOpen)
                    }
                  />
                ) : (
                  <TeamSelectionCard
                    team1={card.team1}
                    team2={card.team2}
                    teams={teams}
                    assets={assets}
                    handleOptionClick={() => handleOptionClick(card)}
                  />
                )}

                <AddTeamModal
                  isModalOpen={
                    isModalOpen[`team1-${card.id}-${activeMatchday}`]
                  }
                  onClose={() => handleToggleModal("team1", card.id, false)}
                  teamType="team1"
                  teams={teams}
                  selectedTeams={card}
                  handleTeamSelection={(teamId) =>
                    handleTeamSelection(teamId, "team1", card.id)
                  }
                  activeMatchday={activeMatchday}
                />

                <AddTeamModal
                  isModalOpen={
                    isModalOpen[`team2-${card.id}-${activeMatchday}`]
                  }
                  onClose={() => handleToggleModal("team2", card.id, false)}
                  teamType="team2"
                  teams={teams}
                  selectedTeams={card}
                  handleTeamSelection={(teamId) =>
                    handleTeamSelection(teamId, "team2", card.id)
                  }
                  activeMatchday={activeMatchday}
                />
              </div>
            ))}
            <Button
              onClick={handleAddCard}
              type="none"
              className="mt-5 bg-blue text-white px-4 py-2 rounded-full"
            >
              Add Match
            </Button>
          </>
        )}

        {/* Match Options Modal */}
        {isOptionModalOpen && (
          <AppModal
            modalopen={isOptionModalOpen}
            onClose={() => setIsOptionModalOpen(false)}
            width={"500px"}
            height={"372px"}
          >
            <p className="font-PJSbold text-lg">Match Options</p>
            <div className="flex flex-col gap-5 mt-5 text-[16px]">
              <Button
                onClick={() => {
                  setIsOptionModalOpen(false);
                  setIsMatchOptionModalOpen(true);
                }}
                className="h-14 rounded-lg font-PJSmedium"
              >
                Match Option
              </Button>
              <Button className="h-14 rounded-lg font-PJSmedium">
                Match Facts
              </Button>
              <Button className="h-14 rounded-lg font-PJSmedium">
                Forfeit
              </Button>
              <Button
                type="none"
                className="h-14 rounded-full bg-secondaryTen font-PJSmedium"
                onClick={() => setIsOptionModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </AppModal>
        )}

        {/* Match Edit Modal */}
        {isMatchOptionModalOpen && (
          <AppModal
            modalopen={isMatchOptionModalOpen}
            onClose={() => setIsMatchOptionModalOpen(false)}
            width={"500px"}
            height={"318px"}
          >
            <p className="font-PJSbold text-lg">Match Options</p>
            <div className="flex flex-col gap-5 mt-5 text-[16px]">
              <Button
                className="h-14 rounded-lg font-PJSmedium"
                onClick={() => handleEditScore(selectedMatch)}
              >
                Edit Score
              </Button>
              <Button className="h-14 rounded-lg font-PJSmedium">
                Reschedule
              </Button>
              <Button
                onClick={() => {
                  setIsMatchOptionModalOpen(false);
                  setRemoveTeamModal(true);
                }}
                type="none"
                className="h-14 rounded-full bg-secondaryTen font-PJSmedium text-redbutton"
              >
                Remove Team
              </Button>
            </div>
          </AppModal>
        )}
        <AppModal
          modalopen={removeTeamModal}
          onClose={() => setRemoveTeamModal(false)}
          width={"500px"}
          height={"342px"}
        >
          <p>Remove a team</p>
          <p>Select the team(s) you would like to remove from this match</p>
        </AppModal>
      </div>
    </div>
  );
};

export default Fixtures;
