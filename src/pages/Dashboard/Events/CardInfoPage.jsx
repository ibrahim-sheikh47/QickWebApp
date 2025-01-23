import { useLocation } from "react-router-dom";
import assets from "../../../assets/assets";
import { Divider } from "antd";
import {
  eventDetails,
  eventFormatDetails,
} from "../../../constants/eventLeagueDetails";
import LeagueWaiverModal from "../../../components/LeagueWaiverModal/LeagueWaiverModal";
import LeagueRuleModal from "../../../components/LeagueRuleModal/LeagueRuleModal";
import { useState } from "react";
const CardInfoPage = () => {
  const location = useLocation();
  const formValues = location.state;

  const [waiverModalOpen, setWaiverModalOpen] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  const openWaiverModal = () => {
    setWaiverModalOpen(true);
  };
  const closeModal = () => {
    setWaiverModalOpen(false);
    setRulesModalOpen(false);
  };

  const openRulesModal = () => {
    setRulesModalOpen(true);
  };

  const renderEventDetails = (details) => {
    return details.map((item, index) => (
      <>
        <div key={index} className="flex mt-5 items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondaryTen flex justify-center items-center">
            <img src={item.icon} alt={item.title} />
          </div>
          <div>
            <p className="text-xs font-PJSmedium text-secondary">
              {item.title}
            </p>
            <p className="text-sm font-PJSmedium mt-1">{item.description}</p>
          </div>
        </div>
        {index !== details.length - 1 && (
          <Divider className="border-secondaryThirty" />
        )}
      </>
    ));
  };

  return (
    <div>
      <div>
        <p className="text-3xl font-PJSextra">Events</p>
        <p className="text-secondary font-PJSregular text-sm">
          You have {"#"} active leagues
        </p>
      </div>

      <div className="bg-white px-10 py-5 mt-10 rounded-2xl">
        <div className="flex items-center gap-5">
          <img
            src={assets.Back}
            alt="Back"
            onClick={() => window.history.back()}
            className="cursor-pointer"
          />
          <img src={assets.club} alt="Facility Icon" className="w-12 h-12" />
          <div>
            <p className="text-2xl font-PJSbold">Facility Name here</p>
            <div className="flex items-center gap-7">
              <span className="text-secondary text-xl font-PJSmedium whitespace-nowrap">
                {formValues.leagueName}
              </span>
              <p
                className={`rounded-3xl text-xs w-full px-4 h-[35px] flex justify-center items-center font-PJSmedium ${
                  {
                    League: "bg-[#9CFC384D]",
                    "League + Knockouts": "bg-[#35E7804D]",
                    "Group Stage + Knockouts": "bg-[#1F29334D]",
                    Knockouts: "bg-[#33C0DB4D]",
                  }[formValues.eventType] || ""
                }`}
              >
                {formValues.eventType}
              </p>
            </div>
          </div>
          <div className="ml-auto cursor-pointer flex gap-5">
            <img
              className="border-2 rounded-full p-3"
              src={assets.editBlack}
              alt=""
            />
            <img
              className="border-2 rounded-full p-4"
              src={assets.share}
              alt=""
            />
          </div>
        </div>
        <img
          src={formValues.imageSrc}
          className="w-full h-80 rounded-3xl mt-5 object-cover"
          alt=""
        />
        <p className="text-[16px] text-secondary font-PJSmedium mt-5">
          General Information
        </p>
        {renderEventDetails(eventDetails(formValues))}
        <p className="text-[16px] text-secondary font-PJSmedium mt-5">Format</p>
        {renderEventDetails(eventFormatDetails(formValues))}
        <div className="block p-4 mt-10 border rounded-2xl text-sm border-secondaryThirty w-full">
          <p className="font-PJSbold text-xs mb-3">Description</p>
          <p
            className="text-sm font-PJSregular text-primary"
            dangerouslySetInnerHTML={{
              __html: formValues.description.replace(/\n/g, "<br />"),
            }}
          />
        </div>
        <div className="flex gap-5 mt-10">
          <button
            onClick={openWaiverModal}
            className="rounded-full underline text-blue border px-7 py-2 border-secondaryThirty"
          >
            League Waiver
          </button>
          <button
            onClick={openRulesModal}
            className="rounded-full underline text-blue border px-7 py-2 border-secondaryThirty"
          >
            League Rules
          </button>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-10 w-full rounded-full bg-secondaryTen border border-secondaryThirty h-[60px]"
        >
          Close
        </button>
      </div>

      <LeagueWaiverModal modalOpen={waiverModalOpen} onClose={closeModal} />
      <LeagueRuleModal modalOpen={rulesModalOpen} onClose={closeModal} />
    </div>
  );
};

export default CardInfoPage;
