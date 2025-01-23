/* eslint-disable react/prop-types */
// components/EventComponents/EventDataRow.js
import { Button } from "antd";

const EventDataRow = ({
  events,
  index,
  handleSeeMore,
  activeTab,
  handleOpenTeamsModal,
  handleOpenPlayersModal,
  handleOpenFreeAgentsModal,
}) => {
  const isTeamsMismatch = events.totalTeams !== events.numTeams;

  return (
    <div className="grid grid-cols-14 gap-4 mx-7 text-sm font-PJSmedium text-[#1F2933] border-b pb-7 mb-7">
      <div className="col-span-3 sticky left-0 z-[99] bg-white">
        <span className="absolute left-[-25px]">{index + 1}</span>
        <span className="underline text-[16px]">{events.eventName}</span>
      </div>

      <div className="col-span-13 grid font-PJSmedium grid-cols-13 items-center text-sm gap-40 whitespace-nowrap">
        <p className="ml-5">{events.type}</p>
        <p>{events.started}</p>
        {activeTab === "Active" && (
          <div className="relative w-[75px] h-5 bg-gray-300 rounded-md">
            <div
              className="absolute top-0 left-0 h-full bg-[#33C0DB] rounded-md"
              style={{ width: `${events.progress}%` }}
            ></div>
            <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-semibold z-10 text-xs">
              {events.progress}%
            </span>
          </div>
        )}
        {activeTab === "Completed" && <span>{events.ended}</span>}
        <p className={isTeamsMismatch ? "text-red-500" : ""}>
          <p
            onClick={() => handleOpenTeamsModal(events)}
            className="underline cursor-pointer"
          >
            {events.numTeams}/{events.totalTeams}
          </p>
        </p>
        <p
          onClick={() => handleOpenPlayersModal(events)}
          className="underline cursor-pointer"
        >
          {events.players}
        </p>
        <p
          onClick={() => handleOpenFreeAgentsModal(events)}
          className="underline cursor-pointer"
        >
          {events.freeAgents}
        </p>
        <p>{events.avgAge} yrs</p>
        <p>
          {events.malePrcnt} / {events.femalePrcnt}
        </p>
        <p>${events.avgPlyrPayment}</p>
        <p>${events.revenue}</p>
        <Button
          className="bg-lime w-[80px]"
          shape="round"
          onClick={() => handleSeeMore(events)}
        >
          See More
        </Button>
      </div>
    </div>
  );
};

export default EventDataRow;
