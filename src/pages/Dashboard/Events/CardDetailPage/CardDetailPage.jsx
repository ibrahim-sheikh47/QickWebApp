import { useLocation } from "react-router-dom";
import { useState } from "react";
import TablesTab from "./TablesTab";
import TeamsTab from "./TeamsTab";
import Fixtures from "./Fixtures";
import assets from "../../../../assets/assets";
import TabSelector from "../../../../components/TabSelector/TabSelector";

const CardDetailPage = () => {
  const location = useLocation();
  const { eventType } = location.state || {};

  const [mainTab, setMainTab] = useState("Fixtures");

  const handleMainTabChange = (tab) => {
    setMainTab(tab);
  };

  const renderTabContent = () => {
    switch (mainTab) {
      case "Fixtures":
        return <Fixtures eventType={eventType} />;
      case "Tables":
        return <TablesTab eventType={eventType} />;
      case "Teams":
        return <TeamsTab />;
      default:
        return <Fixtures eventType={eventType} />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="relative cursor-pointer flex items-center">
            <p>Facility Name Here</p>
            <img
              src={assets.down}
              className="w-6"
              alt="Expand facility options"
            />
          </div>
          <p className="font-PJSregular text-sm text-secondary mt-2">
            Seamless Soccer Facility Management
          </p>
        </div>

        <TabSelector
          tabs={["Fixtures", "Tables", "Teams"]}
          initialActiveTab={"Fixtures"}
          tabStyle={"gap-0 rounded-full w-[470px] justify-between p-1 mt-0"}
          buttonStyle={"border-none w-[154px] text-black"}
          activeTabColor="bg-secondaryTen"
          activeTabText="text-black"
          activeTab={mainTab}
          onTabClick={handleMainTabChange}
        />
      </div>
      <div>{renderTabContent(eventType)}</div>
    </div>
  );
};

export default CardDetailPage;
