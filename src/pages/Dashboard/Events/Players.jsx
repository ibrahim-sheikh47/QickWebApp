import React, { useState } from "react";
import { Button, Divider } from "antd";
import { playersData } from "../../../constants/reportsIndex";
import assets from "../../../assets/assets";
import { useLocation } from "react-router-dom";
import { AppModal } from "../../../components";

const Players = () => {
  const location = useLocation();
  const { team } = location.state || { name: "Unknown Team" };

  const [manageAccessModalOpen, setManageAccessModalOpen] = useState(false);
  return (
    <div className="bg-white mt-10 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <img
          src={assets.Back}
          alt="Back"
          onClick={() => window.history.back()}
          className="cursor-pointer"
        />
        <div className="flex items-center gap-4 cursor-pointer">
          <img
            src={team.icon}
            alt={`${team.name} icon`}
            className="w-10 h-10"
          />
          <div>
            <p className="text-xl font-PJSbold text-primary">{team.name}</p>
            <p className="text-sm font-PJSmedium text-secondary">
              {team.level}
            </p>
          </div>
        </div>
        <Button
          type="none bg-lime h-[42px] rounded-full ml-auto text-sm font-PJSmedium"
          onClick={() => setManageAccessModalOpen(true)}
        >
          Manage Access
        </Button>
      </div>
      <Divider />
      {playersData.map((player, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-3">
            <p className="mr-8 text-sm">{index + 1}</p>
            <img
              className="w-10 h-10 rounded-full"
              src={player.img}
              alt={`${player.name} image`}
            />
            <p className="whitespace-nowrap text-primary text-sm font-PJSmedium">
              {player.name}
            </p>
            {player.isAdmin && (
              <p className="whitespace-nowrap text-secondary text-xs font-PJSmedium">
                (Admin)
              </p>
            )}
            {player.isPro && (
              <p className="text-[10px] italic bg-lime rounded-3xl py-1/2 px-2 font-PJSbold">
                PRO
              </p>
            )}
          </div>
          {index < playersData.length - 1 && (
            <Divider className="border-t-1 border-t-secondaryThirty" />
          )}
        </React.Fragment>
      ))}
      <AppModal
        modalopen={manageAccessModalOpen}
        onClose={() => setManageAccessModalOpen(false)}
        width={"500px"}
        height={"370px"}
      >
        <div className="mx-auto text-center">
          <div className="w-20 h-20 bg-secondaryTen rounded-full flex items-center justify-center mx-auto">
            <img src={assets.UsersThree} className="w-12 h-12" alt="" />
          </div>
          <p className="text-xl font-PJSbold text-primary mt-5">
            Manage Team Access
          </p>
          <p className="text-sm font-PJSmedium text-secondary mt-2">
            Choose how to handle team removal and refunds
          </p>
          <div className="flex flex-col items-center gap-5 mt-10">
            <Button
              className="w-full h-[54px] rounded-full bg-secondaryTen text-[16px] font-PJSmedium hover:scale-105"
              type="none"
            >
              Remove team without refunds
            </Button>
            <Button
              className="w-full h-[54px] rounded-full bg-lime text-[16px] font-PJSmedium hover:scale-105"
              type="none"
            >
              Remove team and grant credit refunds
            </Button>
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default Players;
