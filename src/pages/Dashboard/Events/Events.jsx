import { useState } from "react";
import assets from "../../../assets/assets";
import { AppModal } from "../../../components";
import { Button, Checkbox, Divider } from "antd";
import { PlusCircleFilled, UnorderedListOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import EventCard from "../../../components/EventCard/EventCard";
import TabSelector from "../../../components/TabSelector/TabSelector";

const Events = () => {
  const location = useLocation();
  const eventData = location.state;
  const formValues = location.state;

  const navigate = useNavigate();
  const [sortModal, setSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState("All");
  const [listView, setListView] = useState(false); // State for toggling view

  const openSortModal = () => {
    setSortModal(true);
  };

  const closeSortModal = () => {
    setSortModal(false);
  };

  const handleSortChange = (option) => {
    setSelectedSort(option);
  };

  const toggleListView = () => {
    setListView(!listView); // Toggle between grid and list views
  };

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

  const handleClickInfo = () => {
    navigate("/Dashboard/Events/EventInfo", { state: { ...formValues } });
  };

  const handleClickCardDetail = () => {
    navigate("/Dashboard/Events/EventDetail", { state: { ...formValues } });
  };

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
            Sort: {selectedSort}
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
                      onChange={() => handleSortChange(option)}
                      checked={selectedSort === option}
                      className="custom-checkbox ml-auto"
                    />
                  </div>
                ))}
              </div>

              <div className="flex mt-8 gap-4 w-full justify-center items-center">
                <button
                  onClick={closeSortModal}
                  className="flex w-[125px] h-[50px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                >
                  Cancel
                </button>
                <button
                  onClick={closeSortModal}
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
          icon={<PlusCircleFilled />}
          type="none"
          onClick={() => navigate("AddEvent")}
        >
          Add Event
        </Button>
      </div>

      <div className="bg-white px-10 py-5 mt-10 rounded-2xl">
        <div className="flex justify-between">
          <TabSelector
            tabs={["Active", "Completed"]}
            initialActiveTab={"Active"}
          />

          <div className="flex items-center gap-2 relative">
            <input
              type="search"
              className="font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:pr-4"
            />
            <img
              src={assets.search}
              alt=""
              className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5"
            />
            <UnorderedListOutlined
              className="rounded-full border bg-secondaryThirty cursor-pointer border-secondaryThirty p-4"
              onClick={toggleListView} // Attach event handler
            />
          </div>
        </div>
        <Divider className=" border-secondaryThirty" />
        {eventData ? (
          <div
            className={`${listView ? "" : "grid grid-cols-2 gap-x-5 gap-y-7"}`}
          >
            <EventCard
              viewType={listView ? "list" : "card"}
              leagueName={eventData.leagueName}
              maxTeams={eventData.maxTeams}
              knockoutTeams={eventData.knockoutTeams}
              numberOfGroups={eventData.numberOfGroups}
              eventStart={eventData.eventStart}
              eventEnd={eventData.eventEnd}
              playableFields={eventData.playableFields}
              imageSrc={eventData.imageSrc}
              eventType={eventData.eventType}
              onClickInfo={handleClickInfo}
              onClickCardDetail={handleClickCardDetail}
            />
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
