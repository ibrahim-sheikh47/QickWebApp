import { Divider } from "antd";
import assets from "../../../assets/assets";
import { useState } from "react";
import { AddEventForm } from "../../../components/AddEventForm/AddEventForm";

const AddEvent = () => {
  const [activeTab, setActiveTab] = useState("League");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div>
        <p className="text-3xl font-PJSextra">Events</p>
        <p className="text-secondary font-PJSregular text-sm">
          You have {"#"} active events
        </p>
      </div>
      <div className="mt-10 bg-white p-10 rounded-lg ">
        <div className="flex gap-4 items-center text-2xl font-PJSbold">
          <img
            src={assets.Back}
            alt="Back"
            onClick={() => window.history.back()}
            className="cursor-pointer"
          />
          New Event
        </div>
        <Divider />
        <p className="font-PJSbold text-xl">Choose event type </p>
        <div className="mt-5 flex bg-white rounded-full h-[42px] gap-5 text-sm font-PJSmedium">
          {[
            "League",
            "League + Knockouts",
            "Group Stage + Knockouts",
            "Knockouts",
          ].map((tab) => (
            <button
              key={tab}
              className={`px-5 rounded-full font-medium text-sm ${
                activeTab === tab
                  ? "bg-blue text-white"
                  : "border-secondaryThirty border"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <AddEventForm eventType={activeTab} />
      </div>
    </div>
  );
};

export default AddEvent;
