/* eslint-disable react/prop-types */
// NumOfTeamModal.js
import React from "react";
import { Button, Divider } from "antd";
import {
  ShareAltOutlined,
  WechatWorkOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { GrCircleInformation } from "react-icons/gr";
import { AiOutlineFieldTime } from "react-icons/ai";
import AppModal from "../AppModal/AppModal";

export const NumOfTeamModal = ({
  modalContent,
  teamsData,
  isModalOpen,
  closeModal,
}) => {
  return (
    <AppModal
      modalopen={isModalOpen.numTeams}
      onClose={() => closeModal("numTeams")}
      height="100%"
      width="80%"
      customStyles={{
        overlay: { zIndex: 100 },
      }}
    >
      {/* Check if the event data exists and display the event name */}
      {modalContent && modalContent.eventName && modalContent.totalTeams && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-PJSbold text-primary">
              {modalContent.eventName}
            </h2>

            <div className="flex gap-4 mr-10">
              <Button
                className="bg-lime"
                shape="round"
                icon={<ShareAltOutlined />}
                size={"large"}
              >
                Share
              </Button>
              <Button
                className="bg-white"
                shape="round"
                icon={<WechatWorkOutlined />}
                size={"large"}
              >
                Chat
              </Button>
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-PJSbold flex items-center gap-2">
                Teams: ({modalContent.numTeams}/{modalContent.totalTeams})
                <span>
                  <GrCircleInformation size={15} className="text-secondary" />
                </span>
              </p>
              <p className="text-xs font-PJSregular text-secondary">
                {modalContent.numTeams}/{modalContent.totalTeams} teams have
                signed up
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
          <Divider />
          <div className="max-h-[80%] overflow-y-auto pb-20">
            {teamsData.map((team, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-4">
                  <p className="text-sm mr-8">{index + 1}</p>
                  <img
                    src={team.icon}
                    alt={`${team.name} icon`}
                    className="w-10 h-10"
                  />
                  <p className="text-sm font-PJSmedium text-primary">
                    {team.name}
                  </p>
                  <p>
                    {team.paymentStatus === "confirmed" ? (
                      <CheckOutlined className="text-primary bg-lime rounded-full p-1 text-xs" />
                    ) : (
                      <AiOutlineFieldTime className="text-secondary text-2xl" />
                    )}
                  </p>
                  <p className="ml-auto text-xs font-PJSmedium text-primary">
                    History: {team.leagueParticipation} League Participation
                  </p>
                </div>
                {index < teamsData.length - 1 && (
                  <Divider className="border-t-1 border-t-secondaryThirty" />
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </AppModal>
  );
};

export default NumOfTeamModal;
