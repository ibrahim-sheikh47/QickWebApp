import { useState } from "react";
import GeneralNotifications from "./GeneralNotifications";
import PaymentNotifications from "./PaymentNotifications";
import assets from "../../../assets/assets";

const Notifications = () => {
    const [activeTab, setActiveTab] = useState("General");

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1">
                        <div className="font-PJSbold text-2xl">Notifications</div>
                        <button onClick={() => handleTabClick("info")}>
                            <img src={assets.info} className="w-[20px] h-[20px]" alt="Info" />
                        </button>
                    </div>
                    <div className="font-PJSregular text-[14px] text-secondary">
                        You have <span className="font-PJSbold">6</span> new messages
                    </div>
                </div>
                <div className="flex justify-center rounded-full bg-white p-1">
                    <button
                        className={`px-10 rounded-full font-PJSmedium text-sm py-2 ${activeTab === "General" ? "bg-secondaryTen" : ""
                            }`}
                        onClick={() => handleTabClick("General")}
                    >
                        General
                    </button>
                    <button
                        className={`px-10 rounded-full font-PJSmedium text-sm py-2 ${activeTab === "Payments" ? "bg-secondaryTen " : ""
                            }`}
                        onClick={() => handleTabClick("Payments")}
                    >
                        Payments
                    </button>
                </div>

            </div>
            {activeTab === "General" && (
                <div><GeneralNotifications /></div>
            )}
            {activeTab === "Payments" && (
                <div><PaymentNotifications /></div>
            )}
        </>
    );
};

export default Notifications;
