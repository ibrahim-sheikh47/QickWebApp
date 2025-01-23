/* eslint-disable react/prop-types */
import { Divider } from "antd";
import AppModal from "../AppModal/AppModal";
import React from "react";

export const PlyrsAndFreeAgentsModal = ({
  modalOpen,
  onClose,
  eventName,
  players,
  title,
  isFreeAgentModal, // Add this prop to distinguish between players and free agents
}) => (
  <AppModal
    modalopen={modalOpen}
    onClose={onClose}
    height="100%"
    width="80%"
    customStyles={{ overlay: { zIndex: 100 } }}
  >
    {eventName && players && (
      <div className="max-h-[80%] overflow-y-auto pb-20">
        <h2 className="text-2xl font-PJSbold text-primary">{eventName}</h2>
        <p className="text-sm font-semibold text-secondary">
          {title} ({players.length})
        </p>
        <Divider />
        <div style={{ maxHeight: "80%", overflowY: "auto" }}>
          {players.map((player, index) => (
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

                {/* Check if it's a Free Agent Modal */}
                {isFreeAgentModal ? (
                  <>
                    {/* Display 'Free Agent' text, and 'PRO' should only appear if isPro is true */}
                    <p className="whitespace-nowrap text-secondary text-xs font-PJSmedium">
                      (Free Agent)
                    </p>
                    {player.isPro && (
                      <p className="text-[10px] italic bg-lime rounded-3xl py-1/2 px-2 font-PJSbold">
                        PRO
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {/* Admin and PRO conditions for players */}
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
                  </>
                )}

                {/* For players, display 'Free Agent' conditionally */}
                {!isFreeAgentModal && player.isFreeAgent && (
                  <p className="whitespace-nowrap text-secondary text-xs font-PJSmedium">
                    (Free Agent)
                  </p>
                )}
              </div>
              {index < players.length - 1 && (
                <Divider className="border-t-1 border-t-secondaryThirty" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    )}
  </AppModal>
);
