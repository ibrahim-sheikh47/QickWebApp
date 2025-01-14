import { useState } from "react";
import assets from "../../../assets/assets";
import { AppModal } from "../../../components";
import { Button, Checkbox } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import EventCard from "../../../components/EventCard/EventCard";

const Events = () => {
  const location = useLocation();
  const eventData = location.state;
  console.log("Event Data from location:", eventData); // Log the data

  const navigate = useNavigate();
  const [sortModal, setSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState("All"); // State to track selected sort option

  const openSortModal = () => {
    setSortModal(true);
  };

  const closeSortModal = () => {
    setSortModal(false);
  };

  const handleSortChange = (option) => {
    setSelectedSort(option); // Update the selected sort option
  };

  // List of sort options
  const sortOptions = [
    "All",
    "Recent First",
    "Oldest First",
    "Leagues",
    "Leagues + KOs",
    "Groups + KOs",
    "KOs",
    "By Progress",
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-PJSextra">Events</p>
          <p className="text-secondary font-PJSregular text-sm">
            You have {"#"} active leagues
          </p>
        </div>
        <div className="relative ml-auto mr-5">
          <button
            onClick={openSortModal}
            className="gap-2 font-PJSregular text-[14px] h-10 w-full px-5 rounded-full border border-secondaryThirty flex justify-center items-center"
          >
            Sort: {selectedSort} {/* Display the selected sort title */}
            <img src={assets.down} alt="Down" />
          </button>

          <AppModal
            onClose={closeSortModal}
            modalopen={sortModal}
            height={"480px"}
            width={"282px"}
            customStyles={{
              overlay: {
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
              },
              modal: {
                position: "absolute",
                top: "0",
                right: "0",
                margin: "0",
              },
            }}
          >
            <div className="flex flex-col justify-center">
              <div className="font-PJSbold text-[20px]">Sort Events</div>
              <div className="flex flex-col gap-4 mt-4">
                {sortOptions.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <p>{option}</p>
                    <Checkbox
                      onChange={() => handleSortChange(option)} // Update selected sort option
                      checked={selectedSort === option} // Highlight the selected option
                      className="custom-checkbox ml-auto" // Custom class for checkbox
                    />
                  </div>
                ))}
              </div>

              <div className="flex mt-8 gap-4 w-full justify-center items-center">
                <button
                  onClick={closeSortModal} // Close modal on cancel
                  className="flex w-[125px] h-[50px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                >
                  Cancel
                </button>
                <button
                  onClick={closeSortModal} // Close modal after clicking sort
                  className="flex w-[125px] h-[50px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                >
                  Sort
                </button>
              </div>
            </div>
          </AppModal>
        </div>
        <Button
          className="bg-lime hover:scale-105"
          shape="round"
          size={"large"}
          icon={<PlusCircleOutlined />}
          type="none"
          onClick={() => navigate("AddEvent")}
        >
          Add Event
        </Button>
      </div>

      <div className="bg-white p-10 mt-10 rounded-2xl">
        {eventData ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-7">
            <div>
              <EventCard
                leagueName={eventData.leagueName}
                maxPlayers={eventData.maxPlayers}
                eventStart={eventData.eventStart}
                eventEnd={eventData.eventEnd}
                playableFields={eventData.playableFields}
                imageSrc={eventData.imageSrc}
                eventType={eventData.eventType}
              />
            </div>
          </div>
        ) : (
          <p className="text-center font-PJSbold text-xl">
            No events available
          </p>
        )}
      </div>
    </>
  );
};

export default Events;
