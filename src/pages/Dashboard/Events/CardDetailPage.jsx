/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import assets from "../../../assets/assets";
import TabSelector from "../../../components/TabSelector/TabSelector";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import AddTeamModal from "../../../components/AddTeamModal/AddTeamModal";
import AddTeamSection from "../../../components/AddTeamSection/AddTeamSection";
import TeamSelectionCard from "../../../components/TeamSelectionCard/TeamSelectionCard";
import { AppModal } from "../../../components";
import {
  assistsData,
  cleanSheetsData,
  goalsData,
  mvpAwardsData,
  tableTeams,
  teams,
} from "../../../constants/leagueIndex";
import PlayerDetailsModal from "../../../components/PlayerDetailsModal/PlayerDetailsModal";
import Fixtures from "./Fixtures";

const CardDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formValues = location.state || {}; // Safe fallback for state

  const [mainTab, setMainTab] = useState("Fixtures");
  const [tableTab, setTableTab] = useState("League");

  const [searchQuery, setSearchQuery] = useState("");

  // Track selected teams for team1 and team2

  // Handle modal open and close

  // Handle main tab change

  const [activeMatchday, setActiveMatchday] = useState("Matchday 1");
  const handleMainTabChange = (tab) => {
    setMainTab(tab);
  };
  const handleTableTabChange = (tab) => {
    setTableTab(tab);
  };

  // Handle matchday tab change
  const handleMatchdayTabChange = (tab) => {
    setActiveMatchday(tab);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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
      render: (_, record) => (
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
    };

    const statKey = columnMapping[statType];

    return [
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
      {
        title: statType,
        dataIndex: statKey, // Use statKey to access the correct field
        key: statKey,
      },
    ];
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="relative cursor-pointer flex items-center">
            <p>Facility Name Here</p>
            <img
              src={assets.down}
              className="w-6"
              alt="Expand facility options"
            />
          </div>
          <p className="font-PJSregular text-sm text-secondary mt-2">
            Seamless Soccer Facility Management
          </p>
        </div>

        <TabSelector
          tabs={["Fixtures", "Tables", "Teams"]}
          initialActiveTab={"Fixtures"}
          tabStyle={"gap-0 rounded-full w-[470px] justify-between p-1 mt-0"}
          buttonStyle={"border-none w-[154px] text-black"}
          activeTabColor="bg-secondaryTen"
          activeTabText="text-black"
          activeTab={mainTab}
          onTabClick={handleMainTabChange}
        />
      </div>

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
            {mainTab === "Fixtures" && (
              <Button
                type="none"
                className="rounded-full h-[42px] border-secondaryThirty border-2"
                icon={<img src={assets.randomize} />}
              >
                Randomize Fixtures
              </Button>
            )}

            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
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
            {mainTab === "Teams" && (
              <Button
                type="none"
                className="rounded-full h-[42px] bg-lime font-PJSmedium"
              >
                Share League
              </Button>
            )}
          </div>
        </div>

        {mainTab === "Fixtures" && (
          <TabSelector
            tabs={[
              "Matchday 1",
              "Matchday 2",
              "Matchday 3",
              "Matchday 4",
              "Matchday 5",
              "Matchday 6",
              "Matchday 7",
            ]}
            initialActiveTab={"Matchday 1"}
            onTabClick={handleMatchdayTabChange}
          />
        )}
        {mainTab === "Tables" && (
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
        )}
      </div>
      <div className="bg-white mt-5 rounded-xl p-4">
        {mainTab === "Fixtures" && <Fixtures />}

        {mainTab === "Tables" && (
          <>
            {tableTab === "League" && (
              <Table
                columns={columns}
                dataSource={tableTeams}
                rowKey="id"
                pagination={true}
              />
            )}
            {tableTab === "Knockouts" && <p>Knockouts</p>}
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
            {tableTab === "Cards" && <p>Cards</p>}
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
          </>
        )}
      </div>
    </div>
  );
};

export default CardDetailPage;
