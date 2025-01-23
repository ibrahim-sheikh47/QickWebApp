/* eslint-disable react/prop-types */
import { useState } from "react";

const TabSelector = ({
  tabs,
  onTabClick,
  initialActiveTab,
  tabStyle,
  buttonStyle,
  activeTabColor = "bg-blue",
  activeTabText = "text-white",
}) => {
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    onTabClick(tabName);
  };

  return (
    <div
      className={`mt-5 flex bg-white rounded-full h-[42px] gap-5 text-sm font-PJSmedium ${tabStyle}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-5 rounded-full font-medium text-sm ${
            activeTab === tab
              ? `${activeTabColor} ${activeTabText}` // Use activeTabColor prop
              : "border-secondaryThirty border"
          } ${buttonStyle}`}
          onClick={() => handleTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
