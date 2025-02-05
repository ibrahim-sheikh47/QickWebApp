import { useLocation } from "react-router-dom";
import assets from "../../../assets/assets";
import { useState } from "react";
import TabSelector from "../../../components/TabSelector/TabSelector";
import Records from "./Records";
import Players from "./Players";

const TeamDetail = () => {
  const location = useLocation();
  const { team } = location.state || { name: "Unknown Team" };
  console.log("Received team data:", team);

  const [mainTab, setMainTab] = useState("Players");

  const handleMainTabChange = (tab) => {
    setMainTab(tab);
  };

  return (
    <>
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
          tabs={["Players", "Record"]}
          initialActiveTab={"Players"}
          tabStyle={"gap-0 rounded-full w-[315px] justify-between p-1 mt-0"}
          buttonStyle={"border-none w-[154px] text-black"}
          activeTabColor="bg-secondaryTen"
          activeTabText="text-black"
          activeTab={mainTab}
          onTabClick={handleMainTabChange}
        />
      </div>

      <div className="">
        {mainTab === "Players" && <Players />}
        {mainTab === "Record" && <Records />}
      </div>
    </>
  );
};

export default TeamDetail;
