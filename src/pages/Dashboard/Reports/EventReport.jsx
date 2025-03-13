/* eslint-disable react/prop-types */
import { useState } from "react";
import assets from "../../../assets/assets";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AppModal } from "../../../components";
import EventHeader from "../../../components/EventHeader/EventHeader";
import EventDataRow from "../../../components/EventDataRow/EventDataRow";
import {
  eventData,
  playersData,
  teamsData,
} from "../../../constants/reportsIndex";
import { PlyrsAndFreeAgentsModal } from "../../../components/PlyrsAndFreeAgentsModal/PlyrsAndFreeAgentsModal";
import NumOfTeamModal from "../../../components/NumOfTeamModal/NumOfTeamModal";
import { useStateContext } from "../../../context";

const getStartAndEndOfWeek = () => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() + 1); // Set to Monday
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(today.getDate() - today.getDay() + 7); // Set to Sunday
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const EventReport = () => {
  const { currentFacility, setCurrentFacility, myFacilities } =
    useStateContext();
  const [isFacilityModalOpen, setFacilityModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Active");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // const handleSeeMore = () => {
  //   alert("See More Clicked");
  // };

  // Filter events based on the activeTab value
  const filteredEventData = eventData.filter(
    (events) => events.status === activeTab
  );

  const [isModalOpen, setIsModalOpen] = useState({
    bookings: false,
    numTeams: false,
    players: false,
    freeAgents: false,
  });
  const [modalContent, setModalContent] = useState(null);
  const openModal = (modalName, content = null) => {
    setModalContent(content); // Pass event data as content
    setIsModalOpen({ ...isModalOpen, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setIsModalOpen({ ...isModalOpen, [modalName]: false });
  };

  const { start, end } = getStartAndEndOfWeek();
  const [dateRangeBookings, setDateRangeBookings] = useState([
    {
      startDate: start,
      endDate: end,
      key: "selection",
    },
  ]);
  const [displayedDate, setDisplayedDate] = useState("1 Jan - 31 Jan 2025");

  // Function to open modal

  // Function to handle date change
  const handleDateChangeBookings = (ranges) => {
    setDateRangeBookings([ranges.selection]);
    // Update the static date displayed in the div
    const startDate = ranges.selection.startDate.toLocaleDateString();
    const endDate = ranges.selection.endDate.toLocaleDateString();
    setDisplayedDate(`${startDate} - ${endDate}`);
  };
  // Function to format the date range to "7 Jan - 30 Jan 25" format
  const formatDateRange = (startDate, endDate) => {
    // Format the start date without the year
    const startFormatted = startDate.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
    });

    // Format the end date with only the last two digits of the year
    const endFormatted = endDate.toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      year: "2-digit", // Display only the last two digits of the year
    });

    return `${startFormatted} - ${endFormatted}`;
  };

  const handleApply = () => {
    const { startDate, endDate } = dateRangeBookings[0];
    setDisplayedDate(formatDateRange(startDate, endDate));
    closeModal("bookings"); // Close the modal after applying the dates
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-start">
        {/* Facility selection UI */}
        <div className="">
          {/* Facility selection dropdown and modal */}
          <div className="relative">
            <p
              onClick={() => setFacilityModalOpen(true)}
              className="font-PJSextra text-3xl text-primary inline-flex items-center gap-3 cursor-pointer"
            >
              {currentFacility ? currentFacility.name : ""}
              <img
                src={assets.down}
                className="w-6"
                alt="Expand facility options"
              />
            </p>
            <AppModal
              modalopen={isFacilityModalOpen}
              onClose={() => setFacilityModalOpen(false)}
              width="25rem"
              customStyles={{
                overlay: { position: "fixed", top: 0, left: 0, right: 0 },
                modal: {
                  position: "absolute",
                  top: "30%",
                  left: "30%",
                  transform: "translate(-50%, -50%)",
                  margin: "0",
                },
              }}
            >
              <div>
                <p
                  className="text-lg font-PJSbold mt-3"
                  style={{ overflowY: "auto" }}
                >
                  Select a facility
                </p>
                {myFacilities.map((facility) => {
                  return (
                    <div
                      className="flex items-center justify-between mt-6 cursor-pointer"
                      onClick={() => {
                        setCurrentFacility(facility);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            facility &&
                            facility.icon &&
                            facility.icon !== null &&
                            facility.icon !== ""
                              ? facility.icon
                              : assets.placeholder
                          }
                          alt="Club"
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="text-sm font-PJSregular">
                          {facility.name}
                        </p>
                      </div>
                      {currentFacility &&
                        currentFacility._id === facility._id && (
                          <img
                            src={assets.CheckCircle}
                            className="w-6"
                            alt="Selected"
                          />
                        )}
                    </div>
                  );
                })}
              </div>
            </AppModal>
          </div>
          <p className="font-PJSregular text-sm text-secondary mt-2">
            Elevate your soccer experience
          </p>
        </div>
        <div className="flex bg-white rounded-full p-1 w-[320px] h-[44px]">
          {["Active", "Completed"].map((tab) => (
            <button
              key={tab}
              className={`px-12 rounded-full font-PJSmedium text-sm ${
                activeTab === tab ? "bg-secondaryTen" : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <img
              src={assets.Back}
              alt="Back"
              onClick={() => window.history.back()}
              className="cursor-pointer"
            />
            <p className="text-2xl font-PJSbold text-primary">
              Events
              <span className="text-secondary font-PJSregular text-sm ml-1">
                ({filteredEventData.length})
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <form className="relative mx-auto w-max">
              <input
                type="search"
                className="peer font-PJSregular text-[14px] cursor-pointer h-12 w-12 rounded-full border-2 border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
              />
              <img
                className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                src={assets.search}
                alt="Search"
              />
            </form>
            <div className="relative">
              {/* Static Date Display */}
              <div
                className="border-2 border-secondaryThirty bg-transparent w-[170px] text-center justify-center flex h-[42px] rounded-full"
                onClick={() => openModal("bookings")}
              >
                <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium cursor-pointer">
                  {displayedDate}
                  <img src={assets.down} alt="Down" />
                </p>
              </div>

              <AppModal
                modalopen={isModalOpen.bookings}
                onClose={() => closeModal("bookings")}
                height="400px"
                width="380px"
                customStyles={{
                  overlay: {
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 100,
                  },
                  modal: {
                    position: "absolute",
                    top: "0",
                    right: "0",
                    margin: "0",
                  },
                }}
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChangeBookings}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRangeBookings}
                  showMonthAndYearPickers={false}
                  showDateDisplay={false}
                  rangeColors={["#33C0DB"]}
                />
                <div className="flex gap-4 w-full justify-center font-PJSMedium items-center ">
                  <button
                    className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                    onClick={() => closeModal("bookings")}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                    onClick={() => handleApply("bookings")}
                  >
                    Apply
                  </button>
                </div>
              </AppModal>
            </div>
            <div className="flex items-center justify-center border-2 border-secondaryThirty bg-transparent w-[130px] h-[42px] rounded-full cursor-pointer">
              <p className="text-sm text-primary font-PJSmedium flex items-center gap-2">
                <img src={assets.download} className="w-5 h-5" alt="Download" />
                Download
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <div className="grid grid-cols-14 gap-4 mx-7 border-b mb-3 pb-3 mt-5">
            <div className="col-span-3 sticky left-0 bg-white  text-sm font-semibold text-[#849AB8] ">
              Event Name
            </div>
            <EventHeader activeTab={activeTab} />
          </div>

          {/* Event Data Rows */}
          {filteredEventData.map((events, index) => (
            <EventDataRow
              key={index}
              events={events}
              index={index}
              activeTab={activeTab}
              handleSeeMore={() => openModal("seeMore", events)}
              handleOpenTeamsModal={() =>
                openModal("numTeams", {
                  eventName: events.eventName,
                  numTeams: events.numTeams,
                  totalTeams: events.totalTeams,
                })
              }
              handleOpenPlayersModal={() =>
                openModal("players", {
                  eventName: events.eventName,
                  players: events.players,
                })
              }
              handleOpenFreeAgentsModal={() =>
                openModal("freeAgents", {
                  eventName: events.eventName,
                  freeAgents: events.freeAgents,
                })
              }
            />
          ))}
        </div>
      </div>
      <NumOfTeamModal
        modalContent={modalContent}
        teamsData={teamsData}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      <PlyrsAndFreeAgentsModal
        modalOpen={isModalOpen.players}
        onClose={() => closeModal("players")}
        eventName={modalContent?.eventName}
        players={playersData}
        title="Players List, including free agents"
      />

      <PlyrsAndFreeAgentsModal
        modalOpen={isModalOpen.freeAgents}
        onClose={() => closeModal("freeAgents")}
        eventName={modalContent?.eventName}
        players={playersData}
        title="Free Agents List"
        isFreeAgentModal={true}
      />
    </div>
  );
};

export default EventReport;
