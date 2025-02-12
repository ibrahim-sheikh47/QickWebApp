/* eslint-disable react/prop-types */

import { useState } from "react";
import { Button, Divider, Table } from "antd";
import { useNavigate } from "react-router-dom";
import assets from "../../../../assets/assets";
import TabSelector from "../../../../components/TabSelector/TabSelector";
import { AppModal } from "../../../../components";
import {
  assistsData,
  cardsData,
  cleanSheetsData,
  goalsData,
  mvpAwardsData,
  tableTeams,
  teams,
} from "../../../../constants/leagueIndex";
import PlayerDetailsModal from "../../../../components/PlayerDetailsModal/PlayerDetailsModal";
import KnockoutTab from "./KnockoutTab";

const TablesTab = ({ eventType }) => {
  const navigate = useNavigate();
  const formValues = location.state || {};
  const [tableTab, setTableTab] = useState("League");
  const handleTableTabChange = (tab) => {
    setTableTab(tab);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const [modalContent, setModalContent] = useState(null);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: `Teams (${tableTeams.length})`,
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.teamImg}
            alt="Team Icon"
            style={{ color: "#FFD700", marginRight: 8, width: 40, height: 40 }}
          />
          <div className="flex-col flex">
            <span className=" text-primary font-PJSbold">{text}</span>
            <span className=" text-secondary text-xs">{record.level}</span>
          </div>
        </div>
      ),
    },
    { title: "P", dataIndex: "p", key: "p" },
    { title: "W", dataIndex: "w", key: "w" },
    { title: "L", dataIndex: "l", key: "l" },
    { title: "D", dataIndex: "d", key: "d" },
    { title: "GF", dataIndex: "gf", key: "gf" },
    { title: "GA", dataIndex: "ga", key: "ga" },
    { title: "+/-", dataIndex: "goalDiff", key: "goalDiff" },
    { title: "PTS", dataIndex: "pts", key: "pts" },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div>
          <Button
            type="primary"
            size="small"
            style={{ marginRight: 8 }}
            className="bg-secondaryTwenty text-secondary rounded-md"
          >
            Move
          </Button>
        </div>
      ),
    },
  ];
  const [visible, setVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null); // Store the selected team
  const [groupTables, setGroupTables] = useState([
    { groupName: "Group 1", data: Array(5).fill(null) },
    { groupName: "Group 2", data: Array(5).fill(null) },
    { groupName: "Group 3", data: Array(5).fill(null) },
    { groupName: "Group 4", data: Array(5).fill(null) },
  ]);

  const handleAddTeamClick = (groupIndex, rowIndex) => {
    setSelectedGroup(groupIndex);
    setSelectedRow(rowIndex);
    setVisible(true);
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const [assignedTeams, setAssignedTeams] = useState(new Set()); // Track assigned teams

  const handleConfirmSelection = () => {
    if (selectedTeam && selectedGroup !== null && selectedRow !== null) {
      setGroupTables((prevTables) => {
        return prevTables.map((group, gIndex) => {
          if (gIndex === selectedGroup) {
            return {
              ...group,
              data: group.data.map((row, rIndex) => {
                if (rIndex === selectedRow) {
                  return {
                    ...row,
                    team: selectedTeam,
                    p: 0,
                    w: 0,
                    l: 0,
                    d: 0,
                    gf: 0,
                    ga: 0,
                    goalDiff: 0,
                    pts: 0,
                  };
                }
                return row;
              }),
            };
          }
          return group;
        });
      });

      setAssignedTeams((prev) => new Set(prev).add(selectedTeam.id)); // Prevent duplicate teams
      setVisible(false);
      setSelectedTeam(null);
    }
  };

  const groupColumns = (groupIndex) => [
    {
      title: "Teams",
      dataIndex: "team",
      key: "team",
      render: (team, record, rowIndex) =>
        team && team.name ? (
          <div className="flex items-center">
            <img src={team.teamIcon} alt={team.name} className="w-7 h-7 mr-2" />
            <span className="text-primary font-bold">{team.name}</span>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 px-3 cursor-pointer"
            onClick={() => handleAddTeamClick(groupIndex, rowIndex)}
          >
            <Button
              size="small"
              icon={<img src={assets.plus} className="w-3 h-3" />}
              className="rounded-full border-none bg-lime"
              type="none"
            />
            <p className="text-sm text-primary font-PJSbold">Add Team</p>
          </div>
        ),
    },
    { title: "P", dataIndex: "p", key: "p" },
    { title: "W", dataIndex: "w", key: "w" },
    { title: "L", dataIndex: "l", key: "l" },
    { title: "D", dataIndex: "d", key: "d" },
    { title: "GF", dataIndex: "gf", key: "gf" },
    { title: "GA", dataIndex: "ga", key: "ga" },
    { title: "+/-", dataIndex: "goalDiff", key: "goalDiff" },
    { title: "PTS", dataIndex: "pts", key: "pts" },
  ];

  const PlayerStatsTable = ({ statColumns, statData }) => {
    return (
      <Table
        columns={statColumns}
        dataSource={statData}
        onRow={(record) => ({
          onClick: () => handleRowClick(record, statColumns[2].title), // Pass stat type dynamically
        })}
      />
    );
  };
  const generateColumns = (statType) => {
    const columnMapping = {
      Goals: "goals",
      Assists: "assists",
      "MVP Awards": "mvpawards",
      "Clean Sheets": "cleansheets",
      Cards: "cards",
    };

    const statKey = columnMapping[statType];

    // Base columns common to all stat types
    const columns = [
      { title: "Id", dataIndex: "id", key: "id" },
      {
        title: "Players",
        dataIndex: "player",
        key: "players",
        render: (text, record) => (
          <div className="flex items-center">
            <img
              src={record.dp}
              alt="Player Avatar"
              style={{
                color: "#FFD700",
                marginRight: 8,
                width: 40,
                height: 40,
              }}
            />
            <div className="flex-col flex">
              <span className="text-primary font-PJSbold">{text}</span>
              <span className="text-secondary text-xs">{record.team}</span>
            </div>
          </div>
        ),
      },
    ];

    // Add a specific column for statType values
    if (statType !== "Cards") {
      columns.push({
        title: statType,
        dataIndex: statKey,
        key: statKey,
        render: (value) => (
          <span className="text-primary font-PJSbold">{value}</span>
        ),
      });
    }

    // Conditionally add the "Cards" column if statType is "Cards"
    if (statType === "Cards") {
      columns.push({
        title: "Cards",
        dataIndex: "cards",
        key: "cards",
        render: (_, record) => {
          const hasYellow = record.yellowCards > 0;
          const hasRed = record.redCards > 0;

          // If no yellow and no red cards, display a slash
          if (!hasYellow && !hasRed) {
            return <span>-</span>;
          }

          // Otherwise, display the cards
          return (
            <div className="flex items-center gap-2">
              {hasYellow && (
                <div className="flex items-center">
                  <img
                    src={assets.yellowCard} // Replace with your yellow card image path
                    alt="Yellow Card"
                    style={{ width: 20, height: 20, marginRight: 4 }}
                  />
                  <span>{record.yellowCards}</span>
                </div>
              )}
              {hasRed && (
                <div className="flex items-center">
                  <img
                    src={assets.redCard} // Replace with your red card image path
                    alt="Red Card"
                    style={{ width: 20, height: 20, marginLeft: 8 }}
                  />
                  <span>{record.redCards}</span>
                </div>
              )}
            </div>
          );
        },
      });
    }

    return columns;
  };

  const handleRowClick = (record, statType) => {
    setModalContent({
      player: record.player,
      team: record.team,
      teamImg: record.teamImg,
      dp: record.dp,
      statType,
      value: record[statType.toLowerCase().replace(/\s+/g, "")],
    });
    setModalVisible(true);
  };
  return (
    <>
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
            <Button
              type="none"
              className="rounded-full h-[42px] border-secondaryThirty border-2"
              //   icon={<img src={assets.randomize} />}
            >
              Finalize Event
            </Button>

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
          tabs={[
            "League",
            "Knockouts",
            "Goals",
            "Assists",
            "Clean Sheets",
            "Cards",
            "MVP Awards",
          ]}
          initialActiveTab={"League"}
          onTabClick={handleTableTabChange}
        />
      </div>
      <div className=" mt-5 rounded-xl p-1">
        {tableTab === "League" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  eventType === "Group Stage + Knockouts"
                    ? "repeat(2, 1fr)"
                    : "1fr",
                gap: "20px",
              }}
            >
              {eventType === "Group Stage + Knockouts" ? (
                <>
                  {groupTables.map((group, index) => (
                    <div key={group.groupName} className="mb-6">
                      <h2 className="text-lg font-bold mb-2">
                        {group.groupName}
                      </h2>
                      <Table
                        columns={groupColumns(index)}
                        dataSource={group.data}
                        pagination={false}
                        className="custom-shadow shadow-custom rounded-xl border"
                      />
                    </div>
                  ))}{" "}
                  <AppModal
                    modalopen={visible}
                    onClose={() => setVisible(false)}
                    width={"500px"}
                    height={"600px"}
                  >
                    <p className="text-xl font-PJSbold">Add Team</p>
                    <p className="mb-5 mt-2 text-secondary text-sm font-PJSmedium">
                      These are the teams registered for this tournament. Assign
                      them to groups as needed.{" "}
                    </p>
                    <div className="max-h-[75%] overflow-y-auto pb-5">
                      {teams.map((team) => (
                        <>
                          <div
                            key={team.id}
                            className="flex items-center justify-between p-2"
                          >
                            <div className="flex items-center">
                              <p>{team.id}</p>
                              <img
                                src={team.teamIcon}
                                alt={team.name}
                                className="w-8 h-8 mx-4"
                              />
                              <div>
                                <p className="text-primary font-PJSmedium text-sm">
                                  {team.name}
                                </p>

                                <p className="text-secondary font-PJSmedium text-xs">
                                  {team.level}
                                </p>
                              </div>
                            </div>

                            <button
                              className={`px-3 py-1 rounded-full text-xs ${
                                assignedTeams.has(team.id)
                                  ? "bg-secondaryTwenty text-redbutton cursor-not-allowed"
                                  : selectedTeam?.id === team.id
                                  ? "bg-lime"
                                  : "bg-secondaryTen"
                              }`}
                              onClick={() =>
                                !assignedTeams.has(team.id) &&
                                handleTeamSelect(team)
                              } // Disable selection
                              disabled={assignedTeams.has(team.id)} // Disable button
                            >
                              {assignedTeams.has(team.id)
                                ? "Added"
                                : selectedTeam?.id === team.id
                                ? "Selected"
                                : "Add"}
                            </button>
                          </div>

                          {team.id !== teams.length && (
                            <Divider className="my-1" />
                          )}
                        </>
                      ))}
                    </div>
                    <button
                      className="w-full bg-lime py-2 mt-4 rounded-full"
                      onClick={handleConfirmSelection}
                    >
                      Confirm
                    </button>
                  </AppModal>
                </>
              ) : (
                <Table
                  columns={columns}
                  dataSource={tableTeams}
                  pagination={false}
                />
              )}
            </div>
          </>
        )}

        {tableTab === "Knockouts" && <KnockoutTab />}
        {tableTab === "Goals" && (
          <>
            <PlayerStatsTable
              statColumns={generateColumns("Goals")}
              statData={goalsData}
            />
          </>
        )}
        {tableTab === "Assists" && (
          <>
            <PlayerStatsTable
              statColumns={generateColumns("Assists")}
              statData={assistsData}
            />
          </>
        )}
        {tableTab === "Clean Sheets" && (
          <>
            <PlayerStatsTable
              statColumns={generateColumns("Clean Sheets")}
              statData={cleanSheetsData}
            />
          </>
        )}
        {tableTab === "Cards" && (
          <>
            <PlayerStatsTable
              statColumns={generateColumns("Cards")}
              statData={cardsData}
            />
          </>
        )}
        {tableTab === "MVP Awards" && (
          <>
            <PlayerStatsTable
              statColumns={generateColumns("MVP Awards")}
              statData={mvpAwardsData}
            />
          </>
        )}
        {modalContent && (
          <PlayerDetailsModal
            isVisible={isModalVisible}
            player={modalContent.player}
            team={modalContent.team}
            dp={modalContent.dp}
            statType={modalContent.statType}
            value={modalContent.value}
            leagueName={formValues.leagueName}
            onClose={() => setModalVisible(false)}
          />
        )}
      </div>
    </>
  );
};

export default TablesTab;
