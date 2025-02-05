/* eslint-disable react/no-unescaped-entities */
import { Button, Divider } from "antd";
import assets from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

import { CheckOutlined } from "@ant-design/icons";
import { AiOutlineFieldTime } from "react-icons/ai";
import React, { useState } from "react";
import { AppModal } from "../../../components";
import {
  freeAgentTeam,
  inviteTeamData,
  leagueTeamsData,
} from "../../../constants/leagueIndex";
const TeamsTab = () => {
  const navigate = useNavigate();
  const formValues = location.state || {};

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [freeAgentModalOpen, setFreeAgentModalOpen] = useState(false);

  const [invitedTeams, setInvitedTeams] = useState({});

  const [selectedTeam, setSelectedTeam] = useState(null);

  const [freeAgentAddedModalOpen, setFreeAgentAddedModalOpen] = useState(false);

  const handleSelectTeam = (teamId) => {
    setSelectedTeam(teamId);
  };

  const handleInvite = (teamId) => {
    setInvitedTeams((prev) => ({
      ...prev,
      [teamId]: true,
    }));
  };

  const handleConfirm = () => {
    setFreeAgentModalOpen(false);
    setFreeAgentAddedModalOpen(true);
  };
  return (
    <div>
      <div className="bg-white mt-10 rounded-xl p-4">
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
          <div className="flex items-center ml-auto gap-4">
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
            <Button
              type="none"
              className="rounded-full h-[42px] bg-lime font-PJSmedium"
              onClick={() => setShareModalOpen(true)}
            >
              Share League
            </Button>
          </div>
        </div>
        <Divider className="mt-5 border-t-secondaryThirty" />
        <div className="flex justify-between items-center">
          <div>
            <p className="font-PJSbold text-xl">Teams (0/0)</p>
            <p className="text-secondary font-PJSregular text-xs">
              0/0 teams have signed up
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <CheckOutlined className="text-primary bg-lime rounded-full p-1 text-xs" />
              <span className="text-xs font-PJSmedium text-primary ml-2">
                Payment Confirmed
              </span>
            </div>
            <div className="flex items-center">
              <AiOutlineFieldTime className="text-secondary text-2xl" />
              <span className="text-xs font-PJSmedium text-primary ml-2">
                Payment Pending
              </span>
            </div>
          </div>
        </div>
        <Divider className=" border-t-secondaryThirty" />

        <div className="flex items-center gap-5">
          {/* Requested Access */}
          <div className="flex items-center justify-center px-5 border-2 border-blue h-12 rounded-full cursor-pointer">
            <p className="text-sm font-PJSmedium">
              {" "}
              {"TEAM"} has requested access
            </p>

            <img src={assets.Next} className="ml-2" alt="" />
          </div>
          {/* Free Agent */}
          <div
            className=" border-[#35E780] flex items-center justify-center px-5 border-2 h-12 rounded-full cursor-pointer"
            onClick={() => setFreeAgentModalOpen(true)}
          >
            <p className="text-sm font-PJSmedium">
              {" "}
              Free Agent : {"Name here"}
            </p>
            <img src={assets.Next} className="ml-2" alt="" />
          </div>
        </div>
        <Divider className=" border-t-secondaryThirty" />
        {leagueTeamsData.map((team, index) => (
          <React.Fragment key={index}>
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() =>
                navigate(
                  `/Dashboard/Events/EventDetail/TeamDetail/${team.name}`,
                  {
                    state: { team },
                  }
                )
              }
            >
              <p className="text-sm mr-8">{index + 1}</p>
              <img
                src={team.icon}
                alt={`${team.name} icon`}
                className="w-10 h-10"
              />
              <div>
                <p className="text-sm font-PJSmedium text-primary">
                  {team.name}
                </p>
                <p className="text-xs font-PJSmedium text-secondary">
                  {team.level}
                </p>
              </div>
              <p>
                {team.paymentStatus === "confirmed" ? (
                  <CheckOutlined className="text-primary bg-lime rounded-full p-1 text-xs" />
                ) : (
                  <AiOutlineFieldTime className="text-secondary text-2xl" />
                )}
              </p>
              <img src={assets.Next} className="ml-auto" alt="" />
            </div>
            {index < leagueTeamsData.length - 1 && (
              <Divider className="border-t-1 border-t-secondaryThirty" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* SHARE MODAL */}
      <AppModal
        modalopen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        width={"500px"}
      >
        <div>
          <p>Invite a Team</p>
          <div className="relative mb-5">
            <input
              type="search"
              className="mt-5 font-PJSregular text-[14px] cursor-pointer relative z-10 h-11 w-full rounded-full border-2 border-secondaryThirty bg-transparent pl-11 outline-none focus:cursor-text focus:pr-4"
            />
            <img
              src={assets.search}
              alt=""
              className="absolute inset-y-[42px] my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5"
            />
          </div>
          <p>Results ({inviteTeamData.length})</p>
          {inviteTeamData.map((team) => (
            <>
              <div className="flex items-center gap-4 cursor-pointer mt-5">
                <img src={assets.team1} className="w-10 h-10" />
                <div>
                  <p className="text-sm font-PJSmedium text-primary">
                    {team.name}
                  </p>
                  <p className="text-xs font-PJSmedium text-secondary">
                    {team.level}
                  </p>
                </div>
                <button
                  onClick={() => handleInvite(team.id)}
                  disabled={invitedTeams[team.id]}
                  className={`ml-auto rounded-full text-sm px-4 py-[6px] ${
                    invitedTeams[team.id]
                      ? "bg-secondaryTen text-secondary cursor-not-allowed"
                      : "bg-lime"
                  }`}
                >
                  {invitedTeams[team.id] ? "Invited" : "Invite"}
                </button>
              </div>
            </>
          ))}
        </div>
      </AppModal>

      {/* FREE AGENT MODAL */}
      <AppModal
        onClose={() => setFreeAgentModalOpen(false)}
        modalopen={freeAgentModalOpen}
        height="auto"
        width="600px"
      >
        <div>
          <p className="font-PJSbold text-xl text-primary">
            Add Free Agent to a Team
          </p>
          <p className="text-sm font-PJSmedium text-secondary mt-2">
            What team would you like to add ("FREE AGENT NAME") to?
          </p>
          {freeAgentTeam.map((team, index) => {
            return (
              <div
                key={index}
                className={`flex items-center mt-7 cursor-pointer
                }`}
                onClick={() => handleSelectTeam(team.id)}
              >
                <p className="mr-5">{index + 1}</p>
                <img src={team.teamIcon} className="w-8 h-8" alt="team logo" />
                <p className="ml-2 mr-1 font-semibold">{team.name}</p>
                <p className="text-sm text-secondary font-PJSmedium">
                  ({team.players} players)
                </p>
                <p
                  className={`ml-auto px-4 py-1 rounded-full text-xs ${
                    selectedTeam === team.id ? "bg-lime" : "bg-secondaryTen"
                  }`}
                >
                  {selectedTeam === team.id ? "Selected" : "Add"}
                </p>
              </div>
            );
          })}
          <Button
            type="none"
            className="rounded-full h-[42px] w-full bg-lime font-PJSmedium mt-10 hover:scale-105"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </AppModal>
      <AppModal
        modalopen={freeAgentAddedModalOpen}
        onClose={() => setFreeAgentAddedModalOpen(false)}
        width={"500px"}
        height={"auto"}
      >
        <div className="text-center">
          <img src={assets.CheckCircle} className="w-14 h-14 mx-auto" alt="" />
          <p className="text-xl font-PJSbold text-primary mt-5">
            Free Agent Added to a Team
          </p>
          <p className="text-sm font-PJSmedium text-secondary mt-2">
            You have successfully added James Morgan to Juniors Club
          </p>

          <div className="flex items-center gap-5 mt-5">
            <Button
              className="flex-1 h-[54px] rounded-full bg-secondaryTen text-[16px] font-PJSmedium"
              type="none"
            >
              Close
            </Button>
            <Button
              className="flex-1 h-[54px] rounded-full bg-lime text-[16px] font-PJSmedium"
              type="none"
            >
              See Team
            </Button>
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default TeamsTab;
